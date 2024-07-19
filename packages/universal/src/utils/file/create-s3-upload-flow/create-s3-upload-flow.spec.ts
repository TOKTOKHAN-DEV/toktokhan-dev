import { createS3UploadFlow } from './create-s3-upload-flow'

// 가짜 prepareUpload 함수
const prepareUpload = async (input: { name: string }) => {
  return { name: input.name, type: 'image' }
}

// 가짜 uploadFileToS3 함수
const uploadFileToS3 = async (s3Config: { name: string; type: string }) => {
  if (s3Config.name === 'fail') {
    throw new Error('Upload failed')
  } else {
    return { ...s3Config, imgUrl: `https://example.com/${s3Config.name}` }
  }
}

describe('createUploadFlow', () => {
  const { uploadFile, uploadFiles } = createS3UploadFlow({
    prepareUpload,
    uploadFileToS3,
  })

  it('should upload a single file successfully', async () => {
    const input = { name: 'example' }
    const expectedResult = {
      name: 'example',
      type: 'image',
      imgUrl: 'https://example.com/example',
    }

    const uploadResult = await uploadFile(input)

    expect(uploadResult).toEqual(expectedResult)
  })

  it('should upload multiple files successfully', async () => {
    const inputs = [{ name: 'example1' }, { name: 'example2' }]
    const expectedResults = [
      {
        name: 'example1',
        type: 'image',
        imgUrl: 'https://example.com/example1',
      },
      {
        name: 'example2',
        type: 'image',
        imgUrl: 'https://example.com/example2',
      },
    ]

    const uploadResults = await uploadFiles(inputs)

    expect(uploadResults.fulfilled).toEqual(expectedResults)
    expect(uploadResults.rejected).toEqual([])
  })

  it('should handle a mix of successful and failed uploads', async () => {
    const inputs = [{ name: 'example1' }, { name: 'fail' }]
    const expectedResults = [
      {
        name: 'example1',
        type: 'image',
        imgUrl: 'https://example.com/example1',
      },
    ]

    const uploadResults = await uploadFiles(inputs)

    expect(uploadResults.fulfilled).toEqual(expectedResults)
    expect(uploadResults.rejected.length).toBe(1)
    expect(uploadResults.rejected[0].reason).toEqual(new Error('Upload failed'))
  })
})
