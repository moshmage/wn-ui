import nextJest from 'next/jest.js'

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
})

// Add any custom config to be passed to Jest
/** @type {import('jest').Config} */
const config = {
  // Add more setup options before each test is run
  // setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  // preset: "@chainsafe/dappeteer",
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  collectCoverage: true,
  coverageProvider: 'v8',
  testMatch: [ "**/?(*.)+(spec|test).[jt]s?(x)" ],
  // transformIgnorePatterns: [
  //   '/node_modules/(?!(multihashes|@taikai\\+dappkit|uint8arrays)@)'
  // ]
}

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
export default async () => {
  const _config = await createJestConfig(config)();
  _config.transformIgnorePatterns.splice(0, 1);
  console.log(_config)
  return _config;
}
