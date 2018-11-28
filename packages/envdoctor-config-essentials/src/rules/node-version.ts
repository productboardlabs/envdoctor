import { exec, semver } from "@envdoctor/utils";

const yarnVersion = async (version = "v8") => {
  const { stdout } = await exec("node", ["-v"]);

  if (!semver.gt(semver.coerce(stdout), semver.coerce(version))) {
    return `${version} is required, ${stdout} is installed`;
  }
};

yarnVersion.description = "Check Node version";

export default yarnVersion;
