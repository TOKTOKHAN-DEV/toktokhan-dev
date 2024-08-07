import { Octokit, RestEndpointMethodTypes } from '@octokit/rest'

import {
  AddCollaboratorParams,
  BlobFileData,
  CommitToBranchParams,
  CreateBlobParams,
  CreateBranchParams,
  CreateCommitParams,
  CreateNewCommitParams,
  CreateRepoParams,
  CreateTreeParams,
  GetCurrentCommitParams,
  IsBranchExistParams,
  PublishFilesToNewRepoParams,
  RemoveCollaboratorParams,
  Tree,
  UpdateExistRepoParams,
} from '../types'

/**
 * GithubManagerParams는 GithubManager 클래스의 생성자에 전달되는 매개변수 타입입니다.
 */
export type GithubManagerParams = {
  /**
   * Github API에 액세스하기 위한 토큰입니다.
   */
  token: string

  /**
   * 레포지토리의 소유자입니다.
   */
  owner: string

  /**
   * 레포지토리의 이름입니다.
   */
  repo: string
}

/**
 * @category Class
 * Octokit을 사용하여 Github Api를 쉽게 사용할 수 있도록 하는 모듈입니다. 레포지토리 생성, 컨텐츠 업로드 등의 메서드가 있습니다.
 * {@link https://octokit.github.io/rest.js/ | @see Octokit REST.js}
 * {@link https://docs.github.com/en/rest/quickstart | GitHub REST API Quickstart}
 */
export class GitHubManager {
  private octokit: Octokit
  private owner: string
  private repo: string

  constructor(data: GithubManagerParams) {
    this.octokit = new Octokit({ auth: data.token })
    this.owner = data.owner
    this.repo = data.repo
  }

  /**
   * 기존 레포지토리에 지정된 브랜치로 주어진 내용을 업로드(push)해주는 메소드입니다.
   */
  updateExistRepo = async ({
    contents,
    paths,
    message,
    branchName,
    baseBranchName = 'main',
    owner = this.owner,
    repo = this.repo,
  }: UpdateExistRepoParams) => {
    const defaultProps = { owner, repo }

    const hasOwnerAccess = await this.checkOwnerAccess(owner)

    if (!hasOwnerAccess) {
      throw new Error('User does not have owner access permissions.')
    }

    const isBranchExist = await this.isBranchExist({
      branchName,
      ...defaultProps,
    })

    if (!isBranchExist) {
      await this.createBranch({ branchName, baseBranchName, ...defaultProps })
    }

    const newCommit = await this.createNewCommit({
      branchName,
      contents,
      paths,
      message,
      ...defaultProps,
    })

    await this.commitToBranch({
      branchName,
      commitSha: newCommit.sha,
      ...defaultProps,
    })
  }

  /**
   * 새로운 레포지토리에 주어진 내용을 게시하는 메소드입니다.
   */
  publishFilesToNewRepo = async ({
    contents,
    paths,
    isPrivate,
    message,
    branchName = 'main',
    owner = this.owner,
    repo = this.repo,
  }: PublishFilesToNewRepoParams) => {
    const defaultProps = { owner, repo }

    const hasOwnerAccess = await this.checkOwnerAccess(owner)

    if (!hasOwnerAccess) {
      throw new Error('User does not have owner access permissions.')
    }

    await this.createRepo({ isPrivate, ...defaultProps })

    const isBranchExist = await this.isBranchExist({
      branchName,
      ...defaultProps,
    })

    if (!isBranchExist) {
      await this.createBranch({
        branchName,
        baseBranchName: branchName,
        ...defaultProps,
      })
    }

    const newCommit = await this.createNewCommit({
      branchName,
      contents,
      paths,
      message,
      ...defaultProps,
    })

    await this.commitToBranch({
      branchName,
      commitSha: newCommit.sha,
      ...defaultProps,
    })
  }

  /**
   * 주어진 파일 경로와 내용을 기반으로 새로운 커밋을 생성합니다.
   * @returns 생성된 커밋의 데이터를 반환합니다.
   */
  createNewCommit = async ({
    branchName,
    contents,
    paths,
    message,
    owner = this.owner,
    repo = this.repo,
  }: CreateNewCommitParams) => {
    const ownerRepo = { owner, repo }

    const currentCommit = await this.getCurrentCommit({
      branchName,
      ...ownerRepo,
    })

    const blobFile = await Promise.all(
      contents.map((content) => this.createBlob({ content, ...ownerRepo })),
    )

    const newTree = await this.createTree({
      filesBlobs: blobFile,
      pathsForBlobs: paths,
      parentTreeSha: currentCommit.treeSha,
      ...ownerRepo,
    })

    const newCommit = await this.createCommit({
      message: message,
      currentTreeSha: newTree.sha,
      currentCommitSha: currentCommit.commitSha,
      ...ownerRepo,
    })

    return newCommit
  }

  /**
   * 레포지토리가 존재하는지 확인하는 메소드입니다.
   * {@link https://docs.github.com/ko/rest/repos/repos?apiVersion=2022-11-28#get-a-repository | @see @see GitHub API - Get a repository}
   * @returns - 레포지토리가 존재하면 true를 반환합니다.
   */
  isRepoExist = async (owner?: string, repo?: string) => {
    const _owner = owner || this.owner
    const _repo = repo || this.repo
    try {
      await this.octokit.repos.get({ owner: _owner, repo: _repo })
      return true
    } catch (error: any) {
      if (error.status === 404) {
        return false
      }
      throw error
    }
  }

  /**
   * 새로운 레포지토리를 생성하는 메소드입니다.
   * {@link https://docs.github.com/ko/rest/repos/repos?apiVersion=2022-11-28#create-an-organization-repository | @see GitHub API - Create an organization repository}
   * {@link https://docs.github.com/en/rest/repos/repos#create-a-repository-for-the-authenticated-user | @see GitHub API - Create a repository for the authenticated user}
   */
  createRepo = async ({
    isPrivate,
    owner = this.owner,
    repo = this.repo,
  }: CreateRepoParams): Promise<
    RestEndpointMethodTypes['repos']['createInOrg']['response']['data'] & {
      isOrg: boolean
    }
  > => {
    const isRepoExist = await this.isRepoExist(owner, repo)
    if (isRepoExist) {
      throw Error(`This repository already exists: ${owner}/${repo}`)
    }

    const isOrg = await this.checkOrganizationValidity(owner)

    if (isOrg) {
      const { data } = await this.octokit.repos.createInOrg({
        org: owner,
        name: repo,
        private: isPrivate,
      })

      return { isOrg, ...data }
    } else {
      const { data } = await this.octokit.repos.createForAuthenticatedUser({
        name: repo,
        private: isPrivate,
      })
      return { isOrg, ...data }
    }
  }

  /**
   *  유효한 조직(Organization)인지 확인하는 메소드입니다.
   * {@link https://docs.github.com/en/rest/orgs/orgs?apiVersion=2022-11-28#get-an-organization| @see GitHub API - Get an organization}
   * @returns 조직(Organization)이 유효하면 `true`를 반환합니다.
   */
  checkOrganizationValidity = async (org?: string): Promise<boolean> => {
    const _org = org || this.owner

    try {
      await this.octokit.rest.orgs.get({
        org: _org,
      })
      return true
    } catch (error: any) {
      if (error.status === 404) {
        return false
      }
      throw error
    }
  }

  /**
   * 인증된 유지의 정보를 조회하는 메소드입니다.
   * {@link https://docs.github.com/en/rest/users/users?apiVersion=2022-11-28#get-the-authenticated-user | @see GitHub API - Get the authenticated app}
   * @returns 인증된 유저에 대한 정보를 반환합니다.
   */
  getUser = async (): Promise<
    RestEndpointMethodTypes['users']['getAuthenticated']['response']['data']
  > => {
    const { data } = await this.octokit.rest.users.getAuthenticated()
    return data
  }

  /**
   * 주어진 auth 토큰으로 사용자의 인증 상태를 확인합니다.
   * 주어진 token에 대해 인증된 사용자인지 확인합니다.
   * {@link https://docs.github.com/en/rest/users/users?apiVersion=2022-11-28#get-the-authenticated-user | @see GitHub API - Get the authenticated app}
   * @returns 성공적으로 인증된 경우 `true`를 반환합니다.
   */
  checkAuthUser = async (): Promise<boolean> => {
    try {
      await this.octokit.rest.users.getAuthenticated()
      return true
    } catch (error: any) {
      return false
    }
  }

  /**
   * 주입된 토큰이 주어진 owner에 대한 권한이 있는지 확인하는 메서드입니다.
   * @returns  권한이 있으면 `true`를 반환하고, 그렇지 않으면 `false`를 반환합니다.
   */
  checkOwnerAccess = async (owner: string): Promise<boolean> => {
    try {
      const isOrg = await this.checkOrganizationValidity(owner)
      if (isOrg) {
        const { data } =
          await this.octokit.orgs.getMembershipForAuthenticatedUser({
            org: owner,
          })
        return data.state === 'active'
      } else {
        const { data } = await this.octokit.users.getAuthenticated()
        return data.login === owner
      }
    } catch (error: any) {
      if (error.status === 404) {
        return false
      }
      throw error
    }
  }

  /**
   *  GitHub App의 인증 자격 증명이 유효한지 확인하는 데 사용됩니다. JWT를 사용하여 이 엔드포인트에 접근해야 하며, GitHub App user access tokens, GitHub App installation access tokens, or fine-grained personal access tokens으로는 작동하지 않습니다.
   * {@link https://docs.github.com/en/rest/apps/apps?apiVersion=2022-11-28#get-the-authenticated-app | @see GitHub API - Get the authenticated app}
   * @returns 인증된 App이면 `true`를 반환합니다.
   */
  checkAppAuthWithJWT = async (): Promise<boolean> => {
    try {
      await this.octokit.rest.apps.getAuthenticated()
      return true
    } catch (error: any) {
      if (error.status === 404) {
        return false
      }
      throw error
    }
  }

  /**
   * 브랜치가 존재하는지 확인하는 메소드입니다.
   * {@link https://docs.github.com/ko/rest/branches/branches?apiVersion=2022-11-28#get-a-branch | @see GitHub API - Get a branch}
   * @param branchName - 확인할 브랜치의 이름입니다.
   * @returns 브랜치가 존재하면 true를 반환합니다.
   */
  isBranchExist = async ({
    branchName,
    owner = this.owner,
    repo = this.repo,
  }: IsBranchExistParams): Promise<boolean> => {
    try {
      await this.octokit.rest.repos.getBranch({
        owner: owner,
        repo: repo,
        branch: branchName,
      })
      return true
    } catch (error: any) {
      if (error.status === 404) {
        return false
      }
      throw error
    }
  }

  /**
   * 새 브랜치를 생성하는 메소드입니다.
   * {@link https://docs.github.com/ko/rest/git/refs?apiVersion=2022-11-28#create-a-reference | @see GitHub API - Create a reference}
   * @param branchName - 생성할 브랜치의 이름입니다.
   * @param baseBranchName 생성할 브랜치의 기준 브랜치 이름입니다. 기본값은 'main'입니다.
   */
  createBranch = async ({
    branchName,
    baseBranchName = 'main',
    owner = this.owner,
    repo = this.repo,
  }: CreateBranchParams) => {
    const { data: baseBranch } = await this.octokit.rest.repos.getBranch({
      branch: baseBranchName,
      owner,
      repo,
    })
    await this.octokit.git.createRef({
      ref: `refs/heads/${branchName}`,
      sha: baseBranch.commit.sha,
      owner,
      repo,
    })
  }

  /**
   * 현재 커밋을 가져오는 메소드입니다.
   * {@link https://docs.github.com/en/rest/git/commits?apiVersion=2022-11-28#get-a-commit-object | @see GitHub API - Get a commit object}
   * @param branchName - 기본 브랜치의 이름입니다.
   * @returns 커밋 SHA와 트리 SHA를 포함하는 객체를 반환합니다.
   */
  getCurrentCommit = async ({
    branchName,
    owner = this.owner,
    repo = this.repo,
  }: GetCurrentCommitParams): Promise<{
    commitSha: string
    treeSha: string
  }> => {
    const { data: refData } = await this.octokit.git.getRef({
      owner,
      repo,
      ref: `heads/${branchName}`,
    })
    const commitSha = refData.object.sha
    const { data: commitData } = await this.octokit.git.getCommit({
      owner,
      repo,
      commit_sha: commitSha,
    })
    return { commitSha, treeSha: commitData.tree.sha }
  }

  /**
   * 파일에 대한 blob를 생성하는 메소드입니다.
   * {@link https://docs.github.com/en/rest/git/blobs?apiVersion=2022-11-28#create-a-blob | @see GitHub API - Create a blob}
   * @param content - 파일의 내용입니다.
   * @returns blob 데이터를 반환합니다.
   */
  createBlob = async ({
    content,
    owner = this.owner,
    repo = this.repo,
  }: CreateBlobParams): Promise<BlobFileData> => {
    const blobData = await this.octokit.git.createBlob({
      owner,
      repo,
      content,
      encoding: 'utf-8',
    })
    return blobData.data
  }

  /**
   * 새 트리를 생성하는 메소드입니다.
   * {@link https://docs.github.com/en/rest/git/trees?apiVersion=2022-11-28#create-a-tree | @see GitHub API - Create a tree}
   * @param filesBlobs - 파일 blob의 배열입니다.
   * @param pathsForBlobs - blob의 경로의 배열입니다.
   * @param  parentTreeSha - 부모 트리의 SHA입니다.
   * @returns 생성된 트리의 데이터를 반환합니다.
   */
  private createTree = async ({
    filesBlobs,
    pathsForBlobs,
    parentTreeSha,
    owner = this.owner,
    repo = this.repo,
  }: CreateTreeParams) => {
    const tree: Tree[] = filesBlobs.map(({ sha }, index) => ({
      path: pathsForBlobs[index],
      mode: `100644`,
      type: `blob`,
      sha,
    }))
    const { data } = await this.octokit.git.createTree({
      tree,
      base_tree: parentTreeSha,
      owner,
      repo,
    })
    return data
  }

  /**
   * 새 커밋을 생성하는 메소드입니다.
   * {@link https://docs.github.com/en/rest/git/commits?apiVersion=2022-11-28#create-a-commit | @see GitHub API - Create a commit}
   * @param message - 커밋 메시지입니다.
   * @returns 생성된 커밋의 데이터를 반환합니다.
   */
  private createCommit = async ({
    message,
    currentTreeSha,
    currentCommitSha,
    owner = this.owner,
    repo = this.repo,
  }: CreateCommitParams) => {
    const { data } = await this.octokit.git.createCommit({
      message,
      tree: currentTreeSha,
      parents: [currentCommitSha],
      owner,
      repo,
    })

    return data
  }

  /**
   * 지정한 브랜치에 커밋을 하는 메소드입니다.
   * {@link https://docs.github.com/en/rest/git/refs?apiVersion=2022-11-28#update-a-reference | @see GitHub API - Update a reference}
   *
   */
  commitToBranch = async ({
    branchName,
    commitSha,
    owner = this.owner,
    repo = this.repo,
  }: CommitToBranchParams) => {
    await this.octokit.git.updateRef({
      ref: `heads/${branchName}`,
      sha: commitSha,
      owner,
      repo,
    })
  }

  /**
   * 레포지토리에 협력할 팀원(collaborator)을 추가하는 메소드입니다.
   * {@link https://docs.github.com/en/rest/collaborators/collaborators?apiVersion=2022-11-28#add-a-repository-collaborator | @see GitHub API - Add a repository collaborator}
   */
  addCollaborator = async ({
    username,
    permission = 'push',
    owner = this.owner,
    repo = this.repo,
    ...params
  }: AddCollaboratorParams) => {
    await this.octokit.rest.repos.addCollaborator({
      username,
      permission,
      owner,
      repo,
      ...params,
    })
  }

  /**
   * 레포지토리에 팀원를 제거하는 메소드입니다.
   * {@link https://docs.github.com/en/rest/collaborators/collaborators?apiVersion=2022-11-28#remove-a-repository-collaborator | @see GitHub API - Remove a repository collaborator}
   */
  removeCollaborator = async ({
    username,
    owner = this.owner,
    repo = this.repo,
  }: RemoveCollaboratorParams) => {
    await this.octokit.rest.repos.removeCollaborator({
      username,
      owner,
      repo,
    })
  }
}

export default GitHubManager
