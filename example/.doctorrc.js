module.exports = {
  extends: ["doctor-config-essentials", require("./doctor")],
  rules: {
    "yarn-version": "on",
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
