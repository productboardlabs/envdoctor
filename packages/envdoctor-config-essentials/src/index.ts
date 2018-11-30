import nodeVersion from "./rules/node-version";
import yarnVersion from "./rules/yarn-version";

export default {
  rules: {
    "yarn-version": yarnVersion,
    "node-version": nodeVersion
  }
};

export { COMPARISON as COMPARATORS } from "./utils/versionComparator";
