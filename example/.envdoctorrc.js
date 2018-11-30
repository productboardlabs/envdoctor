const { COMPARATORS } = require("@envdoctor/envdoctor-config-essentials");

module.exports = {
  extends: ["@envdoctor/essentials", require("./doctor")],
  rules: {
    "node-version": [2, { comparator: COMPARATORS.GT, version: "9" }],
    "yarn-version": [2, { comparator: COMPARATORS.EQ, version: "1.12.3" }],
    "just-test": [
      1,
      null,
      () =>
        new Promise(res =>
          setTimeout(() => {
            res("Almost passed");
          }, 30)
        )
    ],
    // loaded from doctor/index.js
    redis: [
      2,
      {
        name: "Redis",
        port: 5432,
        host: "localhost"
      }
    ]
  }
};
