const { exec } = require("envdoctor");
const semver = require("semver");

const yarnVersion = async (version = "v8") => {
  const { stdout } = await exec("node", ["-v"]);

  if (!semver.gt(semver.coerce(stdout), semver.coerce(version))) {
    return `${version} is required, ${stdout} is installed`;
  }
};

yarnVersion.description = "Check Node version";

export default yarnVersion;
