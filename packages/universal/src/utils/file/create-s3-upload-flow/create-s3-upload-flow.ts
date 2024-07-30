import { prop } from 'lodash/fp'

export interface CreateS3UploadFlowConfig<Input, S3Config, Result> {
  /**
   *
   * 파일을 업로드하기 전에 필요한 정보를 준비합니다.
   *  - 주로 presigned url 을 생성하고, 필요한 정보를 준비합니다.
   *  - 해당 함수의 parameter type 은 이후 return 되는 uploadFile 함수의 input type 이 됩니다.
   *  - 해당 함수의 return type 은 `config.uploadFileToS3` 함수의 input type 이 됩니다.
   *
   */
  prepareUpload: (input: Input) => Promise<S3Config>
  /**
   * S3에 파일을 업로드합니다.
   *  - 주로 s3 에 파일을 업로드합니다.
   *  - 해당 함수의 parameter type 은 `config.prepareUpload` 함수의 return type 이 됩니다.
   *  - 해당 함수의 return type 은 이후 return 되는 uploadFile 함수의 return type 이 됩니다.
   */
  uploadFileToS3: (s3Config: S3Config) => Promise<Result>
}

export interface CreateS3UploadFlowReturn<Input, Result> {
  /**
   * 단일 파일을 업로드합니다.
   */
  uploadFile: (input: Input) => Promise<Result>
  /**
   * 다수의 파일을 업로드합니다.
   */
  uploadFiles: (
    input: Input[],
  ) => Promise<{ fulfilled: Result[]; rejected: PromiseRejectedResult[] }>
}

/**
 * @category Utils/File
 *
 * createUploadFlow 함수는 S3 파일 업로드를 위한 플로우를 생성합니다.
 *
 * @example
 *
 * ```ts
 * const { uploadFile, uploadFiles } = createUploadFlow({
 *    prepareUpload: async ({name} : {name : string}) => {
 *    return {
 *       name: name,
 *       type: "image",
 *     }
 *  },
 *    uploadFileToS3: async ({ name, type }) => {
 *     return { name, type, imgUrl: "https://example.com" }
 *  },
 * })
 *
 * const result = await uploadFile({ name: "example" }) // { name: "example", type: "image", imgUrl: "https://example.com" }
 * const results = await uploadFiles([{ name: "example" }, { name: "example2" }]) // { fulfilled: [{ name: "example", type: "image", imgUrl: "https://example.com" } , ...], rejected: [] }
 * ```
 *
 */
export const createS3UploadFlow = <Input, S3Config, Result>(
  config: CreateS3UploadFlowConfig<Input, S3Config, Result>,
): CreateS3UploadFlowReturn<Input, Result> => {
  const uploadFile = (input: Input) =>
    config
      .prepareUpload(input) //
      .then(config.uploadFileToS3)

  const uploadFiles = async (inputs: Input[]) => {
    const files = inputs.map(uploadFile)
    const results = await Promise.allSettled(files)

    const fulfilled = results
      .filter((res) => res.status === 'fulfilled')
      .map(prop('value')) as Result[]

    const rejected = results //
      .filter((res) => res.status === 'rejected') as PromiseRejectedResult[]

    return {
      fulfilled,
      rejected,
    }
  }
  return {
    uploadFile,
    uploadFiles,
  }
}
