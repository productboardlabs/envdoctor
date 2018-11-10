const execa = require("execa");

const testPort = async ({ host, port, name }) => {
  try {
    await execa("nc", ["-vz", "localhost", port]);
  } catch (e) {
    return `${port} is unreachable`;
  }
};

testPort.description = ({ port }) => `Check if port (${port}) is available`;

module.exports = testPort;
