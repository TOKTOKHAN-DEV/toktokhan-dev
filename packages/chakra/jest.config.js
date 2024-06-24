/** @type {import('ts-jest').JestConfigWithTsJest} */
export default {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  resetMocks: false,
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
}
