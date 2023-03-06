import type { Config } from '@jest/types'

export default async (): Promise<Config.InitialOptions> => {
  return {
    preset: 'ts-jest',
    testEnvironment: 'node',
    modulePathIgnorePatterns: ['<rootDir>/build/'],
    globals: {
      'ts-jest': {
        diagnostics: {
          ignoreCodes: [151001],
          tsconfig: '<rootDir>/tsconfig.json',
        },
      },
    },
    moduleNameMapper: {
      '^@/(.*)$': '<rootDir>/src/$1',
    },
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    testMatch: ['<rootDir>/src/tests/**/*.test.ts'],
    collectCoverageFrom: ['src/**/*.ts', '!src/main.ts', '!src/types/**/*.ts'],
    coverageDirectory: 'coverage',
  }
}

require('ts-node/register')
