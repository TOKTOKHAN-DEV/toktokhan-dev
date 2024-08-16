/** @type {import('ts-jest').JestConfigWithTsJest} */
export default {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  resetMocks: false,
  verbose: true,
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
}
