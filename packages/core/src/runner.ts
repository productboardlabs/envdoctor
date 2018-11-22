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
  rules: Array<[string, [number, any, IFunctionRule]]>,
  outputStream: NodeJS.WritableStream = process.stderr
) {
  // strip out disabled rules
  const enabledRules = rules.filter(
    ([, [severity]]) => severity !== SEVERITY.OFF
  );

  for (const rule of enabledRules) {
    const [name, [severity, parameters, fn]] = rule;
    let text = getDescription(rule);

    await new Promise(async res => {
      const spinner = ora({
        text,
        stream: outputStream
      }).start();

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
          text += `: ${status}`;
        }

        switch (severity) {
          case SEVERITY.WARN:
            spinner.warn(text);
            break;
          default:
            spinner.fail(text);
            break;
        }
      } else {
        spinner.succeed();
      }

      res(true);
    });
  }
}
