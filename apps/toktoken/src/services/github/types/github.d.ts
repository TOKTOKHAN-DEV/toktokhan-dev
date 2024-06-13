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
