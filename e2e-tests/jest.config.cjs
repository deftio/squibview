module.exports = {
  preset: 'jest-puppeteer',
  testMatch: ['**/e2e-tests/**/*.test.cjs'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.cjs'],
  testTimeout: 30000
};