const { exec } = require("@envdoctor/core");
const semver = require("semver");

const yarnVersion = async (version = "1.10.0") => {
  const { stdout } = await exec("yarn", ["-v"]);

  if (!semver.gt(stdout, version)) {
    return `${version} is required, ${stdout} is installed`;
  }
};

yarnVersion.description = "Check Yarn version";

export default yarnVersion;
