import * as ora from "ora";

enum SEVERITY {
  OFF,
  WARN,
  ERROR
}

export function getDescription(rule: [string, [number, any, IFunctionRule]]) {
  const [name, [, parameters, fn]] = rule;

  if (fn.description) {
    return typeof fn.description === "function"
      ? fn.description(parameters)
      : fn.description;
  }

  return name;
}

export default async function runner(
  rules: Array<[string, [number, any, IFunctionRule]]>
) {
  // strip out disabled rules and rules without definition
  const validRules = rules.filter(
    ([, [severity, , fn]]) => severity !== SEVERITY.OFF && fn !== undefined
  );

  for (const rule of validRules) {
    const [name, [severity, parameters, fn]] = rule;
    let message = getDescription(rule);

    await new Promise(async res => {
      const spinner = ora(message).start();

      let status;
      try {
        status = await fn(parameters);
      } catch (e) {
        spinner.info(`Rule "${name}" has thrown an error: "${e}"`);
        return res(false);
      }

      const isStatusString = typeof status === "string";

      if (isStatusString || status === false || status === 0) {
        if (isStatusString) {
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

      res(true);
    });
  }
}
