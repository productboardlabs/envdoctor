import is from "@sindresorhus/is";

const DEFAULT_PARAMETERS = undefined;

const STRING_SEVERITY_MAP = {
  disabled: 0,
  off: 0,
  warn: 1,
  on: 2,
  enabled: 2,
  error: 2
};

export default function ruleDefinitionParser(
  rule: Rule
): [number, any, IFunctionRule] {
  let arrayRule: any = rule;

  if (!Array.isArray(rule)) {
    arrayRule = [rule];
  }

  // tslint:disable-next-line
  let [severity, parameters = DEFAULT_PARAMETERS, fn] = arrayRule as [
    any,
    any,
    IFunctionRule
  ];

  if (is.number(severity)) {
    if (rule > 2 || rule < 0) {
      throw new Error(`Wrong ${rule} number format`);
    }
  }

  if (is.boolean(severity)) {
    severity = severity ? 2 : 0;
  }

  if (is.string(severity)) {
    const text = severity.toLowerCase();
    const mappedSeverity = STRING_SEVERITY_MAP[text];

    if (mappedSeverity === undefined) {
      throw new Error(`Wrong ("${text}") string format`);
    }

    severity = mappedSeverity;
  }

  return [severity, parameters, fn];
}
