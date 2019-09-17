import fs from "fs";
import { exec, semver } from "@envdoctor/utils";
import versionComparator, {
  IConfiguration as IVersionComparatorConfiguration
} from "../utils/versionComparator";

export interface IConfiguration extends IVersionComparatorConfiguration {
  file?: string;
}

const nodeVersion = async (configuration: IConfiguration) => {
  if (!configuration) {
    throw new Error("You have to provide valid configuration");
  }

  const { file } = configuration;

  const { stdout: installedVersion } = await exec("node", ["-v"]);

  if (file) {
    let versionDefinedInFile;
    const filePath = `${process.cwd()}/${file}`;
    try {
      versionDefinedInFile = fs
        .readFileSync(filePath)
        .toString()
        .trim();
    } catch (e) {
      throw new Error(`File hasn't been found at ${filePath}`);
    }

    if (
      semver.diff(
        semver.coerce(installedVersion),
        semver.coerce(versionDefinedInFile)
      ) === "major"
    ) {
      return `${versionDefinedInFile} is required (based on ${file}, major has to match), ${installedVersion} is installed`;
    }

    return;
  }

  versionComparator(configuration, installedVersion);
};

nodeVersion.description = "Check Node version";

export default nodeVersion;
