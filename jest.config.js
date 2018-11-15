module.exports = {
  roots: ["<rootDir>/packages"],
  transform: {
    "^.+\\.tsx?$": "ts-jest"
  },
  moduleNameMapper: {
    "example-package": "<rootDir>/__mocks__/package-mock.js",
    "envdoctor-config-example": "<rootDir>/__mocks__/package-mock.js",
    "@scoped/example-package": "<rootDir>/__mocks__/package-mock.js",
    "@scoped/envdoctor-config-example": "<rootDir>/__mocks__/package-mock.js",
    "@scoped/envdoctor-config": "<rootDir>/__mocks__/package-mock.js"
  },
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"]
};
