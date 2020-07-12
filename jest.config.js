/**
 * JEST CONFIG
 *
 * Additional jest package configuration.
 * Bundles third party packages and setup files
 */

module.exports = {
  testEnvironment: "node",
  modulePathIgnorePatterns: [".next/", "cypress"],
  moduleNameMapper: {
    "^components(.*)$": "<rootDir>/src/components$1",
    "^hooks(.*)$": "<rootDir>/src/hooks$1",
    "^styles(.*)$": "<rootDir>/src/styles$1",
    "^utils(.*)$": "<rootDir>/src/utils$1",
  },
  setupFilesAfterEnv: [
    "jest-extended", // @see https://github.com/jest-community/jest-extended
    "jest-expect-message", // @see https://github.com/mattphillips/jest-expect-message
    "./jest.setup.js",
  ],
};
