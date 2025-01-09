require("dotenv-flow").config({
  node_env: "test",
  silent: true,
});

module.exports = {
  roots: ["<rootDir>/build/__tests__"],
  testRegex: "build/__tests__\\/.*\\.test\\.js$",
  moduleFileExtensions: ["js", "json", "node"],
  moduleNameMapper: {},
  moduleDirectories: ["node_modules"],
  resetMocks: true,
  testEnvironment: "node",
  testTimeout: 30000,
  transform: {
    "^.+\\.js$": "babel-jest",
  },
  coveragePathIgnorePatterns: ["src/codegen/"],
  setupFiles: ["<rootDir>/jest.setup.js"],
};
