module.exports = {
  // Lint & Prettify TS and JS files
  '**/*.ts?(x)': (filenames) => [
    `yarn lint:fix ${filenames.join(' ')}`,
    `yarn eslint ${filenames.join(' ')}`,
    `yarn prettier --write ${filenames.join(' ')}`,
  ],
};
