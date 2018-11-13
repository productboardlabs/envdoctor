import { definitionParser } from "../utils";
import { mergeAll, compose, values } from "ramda";

export default function getRules(mainConfiguration: IConfig) {
  const rules: IRules = {};
  const alreadyParsedPackages: string[] = [];

  function getRulesRecursive(configuration: string | IConfig) {
    let config: IConfig;

    if (typeof configuration === "string") {
      if (alreadyParsedPackages.includes(configuration)) {
        return;
      }

      alreadyParsedPackages.push(configuration);

      try {
        // let's try pre-scoped package first
        config = require(`envdoctor-config-${configuration}`);
      } catch (e) {
        try {
          // then fallback to full name package
          config = require(configuration);
        } catch (e) {
          throw new Error(
            `Configuration "${configuration}" or "envdoctor-config-${configuration}" doesn't found: `
          );
        }
      }

      if (config.__esModule) {
        config = config.default;
      }
    } else if (typeof configuration === "object") {
      config = configuration;
    }

    // tslint-disable-next-line
    let { extends: e, rules: r } = config;

    if (e) {
      if (!Array.isArray(e)) {
        e = [e];
      }

      e.forEach(extend => getRulesRecursive(extend));
    }

    if (r) {
      Object.entries(r).map(([name, definition]) => {
        if (!rules[name]) {
          rules[name] = [];
        }

        if (typeof definition === "function") {
          definition = [2, undefined, definition];
        }

        if (!Array.isArray(definition)) {
          definition = [definition];
        }

        rules[name].push(definition);
      });
    }
  }

  getRulesRecursive(mainConfiguration);

  // normalize the rules
  return Object.entries(rules).map(([name, definitions]) => {
    const definition = (compose(
      values,
      mergeAll
    )(definitions) as unknown) as [number, any, IFunctionRule];

    if (!definition) {
      throw new Error(`Definition for rule "${name}" hasn't been found`);
    }

    return [name, definitionParser(definition)] as [
      string,
      [number, any, IFunctionRule]
    ];
  });
}
