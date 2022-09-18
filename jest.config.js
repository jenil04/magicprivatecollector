module.exports = {
  roots: ["<rootDir>"],
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  testRegex: "(/__tests__/.*|(\\.|/)(test))\\.ts?$",
  testPathIgnorePatterns: [
    "/node_modules/",
    "/__tests__/testData/",
    "/__tests__/seeds/",
  ],
  testTimeout: 10000,
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  collectCoverage: true,
  coverageThreshold: {
    global: {
      branches: 1,
      functions: 1,
      lines: 1,
      statements: 1,
    },
  },
  collectCoverageFrom: [
    "backend/utils/*.ts",
  ],
};
