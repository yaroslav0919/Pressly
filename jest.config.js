const nextJest = require('next/jest');

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
});

// Add any custom config to be passed to Jest
/** @type {import('jest').Config} */
const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    '^@pages/(.*)$': '<rootDir>/src/pages/$1',
    '^@common/(.*)$': '<rootDir>/src/common/$1',
    '^@components/(.*)$': '<rootDir>/src/components/$1',
    '^@layouts/(.*)$': '<rootDir>/src/layouts/$1',
    '^@styles/(.*)$': '<rootDir>/src/styles/$1',
    '^@context/(.*)$': '<rootDir>/src/context/$1',
    '^@store/(.*)$': '<rootDir>/src/store/$1',
    '^@services/(.*)$': '<rootDir>/src/services/$1',
    '^@hooks/(.*)$': '<rootDir>/src/hooks/$1',
    '^@repositories/(.*)$': '<rootDir>/server/repositories/$1',
    '^@entities/(.*)$': '<rootDir>/server/entities/$1',
    '^@controllers/(.*)$': '<rootDir>/server/controllers/$1',
    '^@server/(.*)$': '<rootDir>/server/$1',
    '^@src/(.*)$': '<rootDir>/src/$1',
  },
  testMatch: ['<rootDir>/jest/**/?(*.)+(spec|test).{ts,tsx,js,jsx}'],
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig);
