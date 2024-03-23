import type { Config } from '@jest/types'

const config: Config.InitialOptions = {
  testEnvironment: 'node',

  // The file extensions that Jest should consider as test files
  testRegex: '\\.(test|spec)\\.ts$',

  // The transform configuration for transpiling TypeScript files
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  verbose: true,
}

export default config
