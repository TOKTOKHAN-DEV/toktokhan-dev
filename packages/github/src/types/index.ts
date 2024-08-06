import { Octokit } from '@octokit/rest'
import { Obj, Parameter } from '@toktokhan-dev/universal'

export type Tree = {
  path: string
  mode: '100644' | '100755' | '040000' | '160000' | '120000'
  type: 'blob' | 'tree' | 'commit'
  sha: string
}
export type BlobFileData = {
  url: string
  sha: string
}

export type GithubCustomError = {
  ref: Object & { status: number }
  errorMsg: string
}

export type OctokitParameterType<T> = Exclude<Parameter<T>, undefined> & Obj

export type Partible<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>

/**
 * `UpdateRepoParams`는 기존 레포지토리에 내용을 업데이트하기 위한 매개변수 타입입니다.
 */
export interface UpdateRepoParams {
  /**
   * 커밋 메시지입니다.
   */
  commitMsg: string

  /**
   * 브랜치 이름입니다. 기본값은 'design-token'입니다.
   */
  branchName?: string

  /**
   * 커밋할 내용입니다.
   */
  content: Obj

  /**
   * 기본 브랜치 이름입니다. 기본값은 'main'입니다.
   */
  baseBranchName?: string

  /**
   * 소스 경로입니다. 기본값은 'public/token.json'입니다.
   */
  sourcePath?: string
  /**
   * 레포지토리의 소유자입니다.
   */
  owner?: string
  /**
   * 레포지토리의 이름입니다.
   */
  repo?: string
}

/**
 * `PublishFilesParams`는 새로운 레포지토리에 파일을 게시하기 위한 매개변수 타입입니다.
 */
export interface PublishFilesParams {
  /**
   * 커밋 메시지입니다.
   */
  commitMsg: string

  /**
   * 브랜치 이름입니다. 기본값은 'main'입니다.
   */
  branchName?: string

  /**
   * 기준이 되는 브랜치 이름입니다. 기본값은 'main'입니다.
   */
  baseBranchName?: string

  /**
   * 파일 내용의 배열입니다.
   */
  fileContents: string[]

  /**
   * 파일 경로의 배열입니다.
   */
  relativePaths: string[]
  /**
   *  게시할 레포지토리의 공개여부입니다.
   */
  isPrivate: boolean
  /**
   * 레포지토리의 소유자입니다.
   */
  owner?: string
  /**
   * 레포지토리의 이름입니다.
   */
  repo?: string
}
export interface IsBranchExistParams {
  /**
   * 브랜치 이름입니다.
   */
  branchName: string
  /**
   * 레포지토리의 소유자입니다.
   */
  owner?: string
  /**
   * 레포지토리의 이름입니다.
   */
  repo?: string
}
export interface CreateBlobParams {
  /**
   * 파일의 내용입니다.
   */
  content: string
  /**
   * 레포지토리의 소유자입니다.
   */
  owner?: string
  /**
   * 레포지토리의 이름입니다.
   */
  repo?: string
}
export interface CreateBranchParams {
  /**
   * 생성할 브랜치의 이름입니다.
   */
  branchName: string
  /**
   * 생성할 브랜치의 기준 브랜치 이름입니다. 기본값은 'main'입니다.
   */
  baseBranchName?: string
  /**
   * 레포지토리의 소유자입니다.
   */
  owner?: string
  /**
   * 레포지토리의 이름입니다.
   */
  repo?: string
}

export interface GetCurrentCommitParams {
  /**
   * 커밋을 가져올 브랜치의 이름입니다.
   */
  branchName: string
  /**
   * 레포지토리의 소유자입니다.
   */
  owner?: string
  /**
   * 레포지토리의 이름입니다.
   */
  repo?: string
}

export interface CreateTreeParams {
  /**
   * 파일 blob의 배열입니다.
   */
  filesBlobs: BlobFileData[]
  /**
   * blob의 경로의 배열입니다.
   */
  pathsForBlobs: string[]
  /**
   * 부모 트리의 SHA입니다.
   */
  parentTreeSha: string
  /**
   * 레포지토리의 소유자입니다.
   */
  owner?: string
  /**
   * 레포지토리의 이름입니다.
   */
  repo?: string
}
export interface CreateCommitParams {
  /**
   * 커밋 메시지입니다.
   */
  message: string
  /**
   * 현재 트리의 SHA입니다.
   */
  currentTreeSha: string
  /**
   * 현재 커밋의 SHA입니다.
   */
  currentCommitSha: string
  /**
   * 레포지토리의 소유자입니다.
   */
  owner?: string
  /**
   * 레포지토리의 이름입니다.
   */
  repo?: string
}

export interface CommitToBranchParams {
  /**
   * 설정할 브랜치의 이름입니다. 기본값은 'main'입니다.
   */
  branchName: string
  /**
   * 설정할 커밋의 SHA입니다.
   */
  commitSha: string
  /**
   * 레포지토리의 소유자입니다.
   */
  owner?: string
  /**
   * 레포지토리의 이름입니다.
   */
  repo?: string
}

export interface CreateRepoParams {
  /**
   * 업로드 할 레포지토리의 공개여부입니다.
   */
  isPrivate: boolean
  /**
   * 레포지토리의 소유자입니다.
   */
  owner?: string
  /**
   * 레포지토리의 이름입니다.
   */
  repo?: string
}

export interface AddCollaboratorParams
  extends Omit<
    OctokitParameterType<Octokit['rest']['repos']['addCollaborator']>,
    'owner' | 'repo' | 'permission'
  > {
  /**
   * 추가할 팀원의 사용자 이름입니다.
   */
  username: string
  /**
   * 팀원에게 부여할 권한입니다. 기본값은 'push'입니다.
   */
  permission?: 'pull' | 'triage' | 'push' | 'maintain' | 'admin'
  /**
   * 레포지토리의 소유자입니다.
   */
  owner?: string
  /**
   * 레포지토리의 이름입니다.
   */
  repo?: string
}

export interface RemoveCollaboratorParams
  extends Omit<
    OctokitParameterType<Octokit['rest']['repos']['removeCollaborator']>,
    'repo' | 'owner' | 'username'
  > {
  /**
   * 제거할 팀원의 사용자 이름입니다.
   */
  username: string
  /**
   * 레포지토리의 소유자입니다.
   */
  owner?: string
  /**
   * 레포지토리의 이름입니다.
   */
  repo?: string
}
