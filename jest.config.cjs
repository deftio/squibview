module.exports = {
  testEnvironment: 'jsdom',
  transform: {
    "^.+\\.js$": "babel-jest"
  },
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "<rootDir>/jest.fileMock.js"
  },
  collectCoverage: true,
  collectCoverageFrom: [
    "src/**/*.js"
  ],
  coverageDirectory: "coverage",
  coverageReporters: [
    "html",
    "text",
    "lcov"
  ],
  // Suppress specific deprecation warnings
  setupFilesAfterEnv: ['./jest.setup.cjs']
};