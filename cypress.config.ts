import { defineConfig } from 'cypress';

export default defineConfig({
  viewportWidth: 1440,
  viewportHeight: 960,
  e2e: {
    baseUrl: 'http://localhost:3000',
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    experimentalRunAllSpecs: true,
  },
  component: {
    devServer: {
      framework: 'next',
      bundler: 'webpack',
    },
    specPattern: 'cypress/components/**/*.cy.{js,jsx,ts,tsx}',
    experimentalSingleTabRunMode: true,
  },
});
