import nodeVersion from "./rules/node-version";
import yarnVersion from "./rules/yarn-version";

export default {
  extends: "doctor-config-essentials",
  rules: {
    "yarn-version": yarnVersion,
    "node-version": nodeVersion,
  },
};
