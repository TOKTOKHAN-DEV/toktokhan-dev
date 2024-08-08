import { genRoutePage } from '.'

console.log('Hi')

genRoutePage.run({
  input: '.mock/pages',
  output: '.mock/generated/routes.ts',
  displayName: 'ROUTES',
  ignored: ['_app.tsx', '_document.tsx', '_error.tsx', 'api/**'],
  oneDepth: true,
})
