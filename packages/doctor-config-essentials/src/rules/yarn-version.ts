const execa = require("execa");
const semver = require("semver");

const yarnVersion = async (version = "1.10.0") => {
  const { stdout } = await execa("yarn", ["-v"]);

  if (!semver.gt(stdout, version)) {
    return `${version} is required, ${stdout} is installed`;
  }
};

yarnVersion.description = "Check Yarn version";

export default yarnVersion;
