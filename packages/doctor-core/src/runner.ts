import { Rules, Implementation } from "./index";
import { Rule, SEVERITY } from "./utils/config";

const ora = require("ora");

function parseConfig(config: Rule[]): [SEVERITY, any?] {
  if (typeof config === "boolean") {
    return [config ? 2 : 0];
  }

  if (typeof config === "number") {
    return [config > 2 && config < 0 ? 2 : config];
  }

  if (typeof config === "string") {
    if (config === "warn") {
      return [1];
    }
    if (config === "error" || config === "on") {
      return [2];
    }
    if (config === "off") {
      return [0];
    }
  }

  if (Array.isArray(config)) {
    let winingConfig: Rule | Rule[] = config;
    if (Array.isArray(config[0])) {
      winingConfig = config[0];
    }

    let severity = 2;
    const parameters = winingConfig[1];

    if (typeof winingConfig[0] === "number") {
      severity =
        winingConfig[0] > 2 && winingConfig[0] < 0 ? 2 : winingConfig[0];
    }

    if (typeof winingConfig[0] === "boolean") {
      severity = winingConfig[0] ? 2 : 0;
    }

    if (typeof winingConfig[0] === "string") {
      if (winingConfig[0] === "warn") {
        severity = 1;
      } else if (winingConfig[0] === "error" || winingConfig[0] === "on") {
        severity = 2;
      } else if (winingConfig[0] === "off") {
        severity = 2;
      }
    }

    return [severity, parameters];
  }

  return [2];
}

export default function runner(rules: Rules, implementation: Implementation) {
  const rulesToRun = Object.entries(implementation)
    .map(([name, [fn]]) => {
      const config = parseConfig(rules[name]);

      return { name, config, fn };
    })
    .filter(({ config: [severity] }) => severity)
    .map(({ name, config, fn }) => {
      const [severity, parameters] = config;

      return {
        name,
        fn,
        parameters,
        severity
      };
    });

  rulesToRun.forEach(async run => {
    const spinner = ora(run.fn.description).start();
    let status;
    try {
      status = await run.fn(run.parameters);
    } catch (e) {
      spinner.info(`Rule "${run.name}" has thrown an error: "${e}"`);
      return;
    }
    if (typeof status === "string" || status == false) {
      if (run.severity === SEVERITY.ERROR) {
        spinner.fail(run.fn.description + ": " + status);
      }
      if (run.severity === SEVERITY.WARN) {
        spinner.warn(run.fn.description + ": " + status);
      }
    } else {
      spinner.succeed();
    }
  });
}
