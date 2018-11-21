module.exports = {
  extends: ["@envdoctor/essentials", require("./doctor")],
  rules: {
    "yarn-version": [2, "1.9.0"],
    "just-test": [
      1,
      null,
      () =>
        new Promise(res =>
          setTimeout(() => {
            res("Almost passed");
          }, 3000)
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
