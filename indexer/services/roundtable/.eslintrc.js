const baseConfig = require('./node_modules/@klyraprotocol-indexer/dev/.eslintrc');

module.exports = {
  ...baseConfig,

  // Override the base configuraiton to set the correct tsconfigRootDir.
  parserOptions: {
    ...baseConfig.parserOptions,
    tsconfigRootDir: __dirname,
  },
};
