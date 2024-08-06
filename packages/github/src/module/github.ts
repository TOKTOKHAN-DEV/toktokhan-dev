import { Octokit, RestEndpointMethodTypes } from '@octokit/rest'

import {
  AddCollaboratorParams,
  BlobFileData,
  CommitToBranchParams,
  CreateBlobParams,
  CreateBranchParams,
  CreateCommitParams,
  CreateRepoParams,
  CreateTreeParams,
  GetCurrentCommitParams,
  IsBranchExistParams,
  PublishFilesParams,
  RemoveCollaboratorParams,
  Tree,
  UpdateRepoParams,
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
    console.log('data.token', data.token)
    this.octokit = new Octokit({ auth: data.token })
    this.owner = data.owner
    this.repo = data.repo
  }

  /**
   * 기존 레포지토리에 지정된 브랜치로 내용을 업로드(push)해주는 메소드입니다.
   * @param params - 업데이트에 필요한 매개변수입니다.
   */
  updateExistRepo = async (params: UpdateRepoParams) => {
    const {
      commitMsg,
      branchName = 'design-token',
      content,
      baseBranchName = 'main',
      sourcePath = 'public/token.json',
      owner = this.owner,
      repo = this.repo,
    } = params

    const defaultProps = { owner, repo }

    await this.checkOrganizationValidity(owner)

    const stringContent = JSON.stringify(content, null, 2)

    const isBranchExist = await this.isBranchExist({
      branchName,
      ...defaultProps,
    })
    if (!isBranchExist) {
      await this.createBranch({ branchName, baseBranchName, ...defaultProps })
    }

    const blobFile = await this.createBlob({
      content: stringContent,
      ...defaultProps,
    })
    const currentCommit = await this.getCurrentCommit({
      branchName,
      ...defaultProps,
    })

    const newTree = await this.createTree({
      filesBlobs: [blobFile],
      pathsForBlobs: [sourcePath],
      parentTreeSha: currentCommit.treeSha,
      ...defaultProps,
    })

    const newCommit = await this.createCommit({
      message: commitMsg,
      currentTreeSha: newTree.sha,
      currentCommitSha: currentCommit.commitSha,
      ...defaultProps,
    })

    await this.commitToBranch({
      branchName,
      commitSha: newCommit.sha,
      ...defaultProps,
    })
  }

  /**
   * 새로운 레포지토리에 파일을 게시하는 메소드입니다.
   * @param params - 메소드의 매개변수입니다.
   * @param params.commitMsg - 커밋 메시지입니다.
   * @param [params.branchName='main'] - 브랜치 이름입니다. 기본값은 'main'입니다.
   * @param [params.baseBranchName='main'] - 기준이 되는 브랜치 이름입니다. 기본값은 'main'입니다.
   * @param params.fileContents - 파일 내용의 배열입니다.
   * @param params.relativePaths - 파일 경로의 배열입니다.
   * @param params.isPrivate - 게시할 레포지토리의 공개여부입니다.
   */
  publishFilesToNewRepo = async (params: PublishFilesParams) => {
    const {
      commitMsg,
      branchName = 'main',
      baseBranchName = 'main',
      fileContents,
      relativePaths,
      isPrivate,
      owner = this.owner,
      repo = this.repo,
    } = params

    const defaultProps = { owner, repo }
    await this.getUser()
    await this.createRepo({ isPrivate, ...defaultProps })

    const blobFile = await Promise.all(
      fileContents.map((content) =>
        this.createBlob({ content, ...defaultProps }),
      ),
    )

    const isBranchExist = await this.isBranchExist({
      branchName,
      ...defaultProps,
    })
    if (!isBranchExist) {
      await this.createBranch({ branchName, baseBranchName, ...defaultProps })
    }

    const currentCommit = await this.getCurrentCommit({
      branchName,
      ...defaultProps,
    })
    const newTree = await this.createTree({
      filesBlobs: blobFile,
      pathsForBlobs: relativePaths,
      parentTreeSha: currentCommit.treeSha,
      ...defaultProps,
    })
    const newCommit = await this.createCommit({
      message: commitMsg,
      currentTreeSha: newTree.sha,
      currentCommitSha: currentCommit.commitSha,
      ...defaultProps,
    })

    await this.commitToBranch({
      branchName,
      commitSha: newCommit.sha,
      ...defaultProps,
    })
  }
  /**
   * 레포지토리가 존재하는지 확인하는 메소드입니다.
   * {@link https://docs.github.com/ko/rest/repos/repos?apiVersion=2022-11-28#get-a-repository | @see @see GitHub API - Get a repository}
   * @param owner - owner 이름입니다.
   * @param repo - 레포지토리 이름입니다.
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
   * @param isOrg - 저장소가 조직을 위한 것인지, 인증된 사용자를 위한 것인지를 나타내는 불리언 값입니다.
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
   * {@link https://docs.github.com/en/rest/orgs/orgs?apiVersion=2022-11-28 | @see GitHub API - Get an organization}
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
  private createBranch = async ({
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
    console.log(owner, repo, this)
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
  private getCurrentCommit = async ({
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
  private createBlob = async ({
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
  private commitToBranch = async ({
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
  public addCollaborator = async ({
    owner = this.owner,
    repo = this.repo,
    username,
    permission = 'push',
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
  public removeCollaborator = async ({
    username,
    owner = this.owner,
    repo = this.repo,
  }: RemoveCollaboratorParams) => {
    await this.octokit.rest.repos.addCollaborator({
      username,
      owner,
      repo,
    })
  }
}

export default GitHubManager
