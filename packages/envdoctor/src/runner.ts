import * as ora from "ora";
import { SEVERITY } from "./index";
import is from "@sindresorhus/is";

function getDescription(rule: [string, [number, any, IFunctionRule]]) {
  const [name, [, parameters, fn]] = rule;

  if (fn.description) {
    return typeof fn.description === "function"
      ? fn.description(parameters)
      : fn.description;
  }

  return name;
}

export default function runner(
  rules: Array<[string, [number, any, IFunctionRule]]>
) {
  rules
    .filter(
      ([, [severity, , fn]]) => severity !== SEVERITY.OFF && fn !== undefined
    )
    .forEach(async rule => {
      const [name, [severity, parameters, fn]] = rule;
      let message = getDescription(rule);

      const spinner = ora(message).start();
      let status;
      try {
        status = await fn(parameters);
      } catch (e) {
        spinner.info(`Rule "${name}" has thrown an error: "${e}"`);
        return;
      }

      if (is.string(status) || status === false || status === 0) {
        if (is.string(status)) {
          message += `: ${status}`;
        }

        switch (severity) {
          case SEVERITY.WARN:
            spinner.warn(message);
            break;
          default:
            spinner.fail(message);
            break;
        }
      } else {
        spinner.succeed();
      }
    });
}
