module.exports = {
  extends: ["essentials", require("./doctor")],
  rules: {
    "yarn-version": [2, "1.9.0"],
    "just-test": [
      1,
      null,
      () => {
        return "Almost passed! :)";
      }
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
