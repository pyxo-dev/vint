module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    '^vint$': '<rootDir>/src',
  },
  coverageDirectory: '<rootDir>/docs/dist/coverage',
}
