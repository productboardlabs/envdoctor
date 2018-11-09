import yarnVersion from "./rules/yarn-version";
import nodeVersion from "./rules/node-version";

export default {
  extends: "doctor-config-essentials",
  rules: {
    "yarn-version": yarnVersion,
    "node-version": nodeVersion
  }
};
