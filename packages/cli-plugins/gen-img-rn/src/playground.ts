import { genImg } from '.'

console.log('Hi')

genImg.run({
  input: './public/img',
  output: './public/MyImage.ts',
  displayName: 'MY_IMAGES2',
  oneDepth: true,
  basePath: '@/assets',
})
