/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */

module.exports = {
  preset: 'ts-jest',
  resolver: "ts-jest-resolver",
  testEnvironment: 'jest-environment-jsdom',
  globals: {
    extensionsToTreatAsEsm: ['.ts', '.js'],
    'ts-jest': {
      tsconfig: 'tsconfig.jest.json',
      useESM: true
    }
  },
  transform: {
    '^.+\\.ts?$': 'ts-jest',
    '^.+\\.js?$': 'ts-jest'
  }
};
