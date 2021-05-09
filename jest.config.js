module.exports = {
  // Needed to correctly handle ES modules in js files.
  // "allowJs" also needs to be set to "true" in "tsconfig.json".
  preset: 'ts-jest/presets/js-with-ts',
  transformIgnorePatterns: ['node_modules/(?!(@pyxo/wint)/)'],

  testEnvironment: 'node',
  moduleNameMapper: {
    '^vint$': '<rootDir>/src',
  },
  coverageDirectory: '<rootDir>/docs/dist/coverage',
}
