import { exec } from "@envdoctor/utils";
import versionComparator, {
  IConfiguration as IVersionComparatorConfiguration
} from "../utils/versionComparator";

const yarnVersion = async (configuration: IVersionComparatorConfiguration) => {
  if (!configuration) {
    throw new Error("You have to provide valid configuration");
  }

  const { stdout: installedVersion } = await exec("yarn", ["-v"]);

  versionComparator(configuration, installedVersion);
};

yarnVersion.description = "Check Yarn version";

export default yarnVersion;
