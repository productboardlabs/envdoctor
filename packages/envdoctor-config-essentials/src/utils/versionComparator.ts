import { semver } from "@envdoctor/utils";

// basend on semver API https://github.com/npm/node-semver#comparison
export const COMPARATORS = {
  EQ: "eq",
  GT: "gt",
  GTE: "gte",
  LT: "lt",
  LTE: "lte"
};

export interface IConfiguration {
  comparator?: string;
  version?: string;
}

export default function versionComparator(
  configuration: IConfiguration,
  installedVersion: string
) {
  if (!configuration) {
    throw new Error("You have to provide valid configuration");
  }

  const { comparator, version } = configuration;

  if (!comparator || !semver[comparator]) {
    throw new Error("Incorrect comparator");
  }

  if (!version) {
    throw new Error("Version has to be specified");
  }

  if (
    !semver[comparator](semver.coerce(installedVersion), semver.coerce(version))
  ) {
    switch (comparator) {
      case COMPARATORS.EQ:
        return `${version} is required, ${installedVersion} is installed`;
      case COMPARATORS.GT:
        return `Greater version than ${version} is required, ${installedVersion} is installed`;
      case COMPARATORS.GTE:
        return `${version} or greater version  is required, ${installedVersion} is installed`;
      case COMPARATORS.LT:
        return `Lower version than ${version} is required, ${installedVersion} is installed`;
      case COMPARATORS.LTE:
        return `${version} or lower is required, ${installedVersion} is installed`;
    }
  }

  return true;
}
