import { Octokit } from '@octokit/rest'
import { Obj } from '@toktokhan-dev/universal'

import { BlobFileData, Tree } from './types/github'

export type GithubManagerParams = {
  token: string
  owner: string
  repo: string
  content: Obj
  baseBranchName: string
  sourcePath: string
}

/**
 * Octokit 라이브러리를 사용하여 GitHub 저장소를 관리하는 클래스입니다.
 * @see {@link https://octokit.github.io/rest.js/}
 * @see {@link https://docs.github.com/en/rest/quickstart}
 */
class GitHubManager {
  private octokit: Octokit
  private owner: string
  private repo: string
  private content: string
  private baseBranchName: string
  private sourcePath: string

  /**
   * @param {GithubManagerParams} params - GitHubManager에 필요한 필수 매개변수입니다.
   */
  constructor({
    token,
    owner,
    repo,
    content,
    baseBranchName,
    sourcePath,
  }: GithubManagerParams) {
    this.octokit = new Octokit({ auth: token })
    this.owner = owner
    this.repo = repo
    this.content = JSON.stringify(content, null, 2)
    this.baseBranchName = baseBranchName
    this.sourcePath = sourcePath
  }

  /**
   * GitHub 저장소에 업로드하는 메소드입니다.
   * @param {Object} params - 메소드의 매개변수입니다.
   * @param {string} params.commitMsg - 커밋 메시지입니다.
   * @param {string} params.branchName - 브랜치 이름입니다. 기본값은 'design-token'입니다.
   */
  uploadToRepository = async ({
    commitMsg,
    branchName = 'design-token',
  }: {
    commitMsg: string
    branchName: string
  }) => {
    await this.checkTokenValidity()

    const isBranchExist = await this.isBranchExist(branchName)
    if (!isBranchExist) await this.createBranch(branchName, this.baseBranchName)

    const blobFile = await this.createBlob(this.content)
    const currentCommit = await this.getCurrentCommit(branchName)
    const newTree = await this.createTree(
      [blobFile],
      [this.sourcePath],
      currentCommit.treeSha,
    )
    const newCommit = await this.createCommit(
      commitMsg,
      newTree.sha,
      currentCommit.commitSha,
    )

    await this.commitToBranch(branchName, newCommit.sha)
  }

  /**
   * 유효한 토큰인지 확인하는 메소드입니다.
   * @returns {Promise<boolean>} 유효한 토큰이면 true를 반환합니다.
   */
  private checkTokenValidity = async () =>
    await this.octokit.rest.users.getAuthenticated()

  /**
   * 브랜치가 존재하는지 확인하는 메소드입니다.
   * @param {string} branchName - 확인할 브랜치의 이름입니다.
   * @returns {Promise<boolean>} 브랜치가 존재하면 true를 반환합니다.
   */
  private isBranchExist = async (branchName: string) => {
    const { data: branches } = await this.octokit.rest.repos.listBranches({
      owner: this.owner,
      repo: this.repo,
    })

    return branches.some((branch) => branch.name === branchName)
  }

  /**
   * 새 브랜치를 생성하는 메소드입니다.
   * @param {string} branchName - 생성할 브랜치의 이름입니다.
   * @param {string} baseBranchName - 생성할 브랜치의 기준 브랜치 이름입니다. 기본값은 'main'입니다.
   */
  private createBranch = async (
    branchName: string,
    baseBranchName: string = 'main',
  ) => {
    const { data: baseBranch } = await this.octokit.rest.repos.getBranch({
      owner: this.owner,
      repo: this.repo,
      branch: baseBranchName,
    })
    await this.octokit.git.createRef({
      owner: this.owner,
      repo: this.repo,
      ref: `refs/heads/${branchName}`,
      sha: baseBranch.commit.sha,
    })
  }

  /**
   * 현재 커밋을 가져오는 메소드입니다.
   * @param {string} baseBranch - 기본 브랜치의 이름입니다.
   * @returns {Promise<Object>} 커밋 SHA와 트리 SHA를 포함하는 객체를 반환합니다.
   */
  private getCurrentCommit = async (
    baseBranch: string,
  ): Promise<{
    commitSha: string
    treeSha: string
  }> => {
    const { data: refData } = await this.octokit.git.getRef({
      owner: this.owner,
      repo: this.repo,
      ref: `heads/${baseBranch}`,
    })
    const commitSha = refData.object.sha
    const { data: commitData } = await this.octokit.git.getCommit({
      owner: this.owner,
      repo: this.repo,
      commit_sha: commitSha,
    })
    return { commitSha, treeSha: commitData.tree.sha }
  }

  /**
   * 파일에 대한 blob를 생성하는 메소드입니다.
   * @param {string} content - 파일의 내용입니다.
   * @returns {Promise<Object>} blob 데이터를 반환합니다.
   */
  private createBlob = async (content: string): Promise<BlobFileData> => {
    const blobData = await this.octokit.git.createBlob({
      owner: this.owner,
      repo: this.repo,
      content,
      encoding: 'utf-8',
    })
    return blobData.data
  }

  /**
   * 새 트리를 생성하는 메소드입니다.
   * @param {BlobFileData[]} filesBlobs - 파일 blob의 배열입니다.
   * @param {string[]} pathsForBlobs - blob의 경로의 배열입니다.
   * @param {string} parentTreeSha - 부모 트리의 SHA입니다.
   * @returns {Promise<Object>} 생성된 트리의 데이터를 반환합니다.
   */
  private createTree = async (
    filesBlobs: BlobFileData[],
    pathsForBlobs: string[],
    parentTreeSha: string,
  ) => {
    const tree: Tree[] = filesBlobs.map(({ sha }, index) => ({
      path: pathsForBlobs[index],
      mode: `100644`,
      type: `blob`,
      sha,
    }))
    const { data } = await this.octokit.git.createTree({
      owner: this.owner,
      repo: this.repo,
      tree,
      base_tree: parentTreeSha,
    })
    return data
  }

  /**
   * 새 커밋을 생성하는 메소드입니다.
   * @param {string} message - 커밋 메시지입니다.
   * @param {string} currentTreeSha - 현재 트리의 SHA입니다.
   * @param {string} currentCommitSha - 현재 커밋의 SHA입니다.
   * @returns {Promise<Object>} 생성된 커밋의 데이터를 반환합니다.
   */
  private createCommit = async (
    message: string,
    currentTreeSha: string,
    currentCommitSha: string,
  ) => {
    const { data } = await this.octokit.git.createCommit({
      owner: this.owner,
      repo: this.repo,
      message,
      tree: currentTreeSha,
      parents: [currentCommitSha],
    })

    return data
  }

  /**
   * 지정한 브랜치에 커밋을 하는 메소드입니다.
   * @param {string} branch - 설정할 브랜치의 이름입니다. 기본값은 'main'입니다.
   * @param {string} commitSha - 설정할 커밋의 SHA입니다.
   */
  private commitToBranch = async (branch: string, commitSha: string) => {
    await this.octokit.git.updateRef({
      owner: this.owner,
      repo: this.repo,
      ref: `heads/${branch}`,
      sha: commitSha,
    })
  }
}

export default GitHubManager
