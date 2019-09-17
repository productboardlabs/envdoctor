module.exports = {
  roots: ["<rootDir>/packages"],
  transform: {
    "^.+\\.tsx?$": "ts-jest"
  },
  coveragePathIgnorePatterns: ["<rootDir>/__fixtures__"],
  moduleNameMapper: {
    "@envdoctor/utils": "<rootDir>/packages/utils/src/index.ts",
    "^bad-package$": "<rootDir>/__fixtures__/packages/bad-package.js",
    "^example-package$": "<rootDir>/__fixtures__/packages/package.js",
    "^es6-package$": "<rootDir>/__fixtures__/packages/es6-package.js",
    "^envdoctor-config-example$": "<rootDir>/__fixtures__/packages/package.js",
    "^@scoped/example-package$": "<rootDir>/__fixtures__/packages/package.js",
    "^@scoped/another-package$":
      "<rootDir>/__fixtures__/packages/another-package.js",
    "^@scoped/envdoctor-config-example$":
      "<rootDir>/__fixtures__/packages/package.js",
    "^@scoped/envdoctor-config$": "<rootDir>/__fixtures__/packages/package.js"
  },
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  globals: {
    "ts-jest": {
      diagnostics: false
    }
  }
};
