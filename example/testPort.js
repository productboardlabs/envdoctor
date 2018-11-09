const execa = require("execa");

const testPort = async ({ host, port, name }) => {
  try {
    await execa("nc", ["-vz", "localhost", port]);
  } catch (e) {
    return `${port} is unreachable`;
  }
};

testPort.description = "Check if port is available";

module.exports = testPort;
