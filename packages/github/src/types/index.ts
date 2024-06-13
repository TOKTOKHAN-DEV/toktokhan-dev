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
}
