import { definitionParser } from "../utils";
import { mergeAll, compose, values } from "ramda";

const ENVDOCTOR_PREFIX = "envdoctor-config";

const SCOPED_REGEX = /^(@[a-z_-]+)\/?([a-z_-]*)/;

export function getPossibleNames(name: string): string[] {
  const [, scope, pkgName] = name.match(SCOPED_REGEX) || [null, null, null];
  if (scope) {
    if (!pkgName) {
      return [`${scope}/${ENVDOCTOR_PREFIX}`];
    }
    return [`${scope}/${ENVDOCTOR_PREFIX}-${pkgName}`, `${scope}/${pkgName}`];
  }

  return [`${ENVDOCTOR_PREFIX}-${name}`, name];
}

export default function getRules(mainConfiguration: IConfig) {
  const rules: IRules = {};
  const alreadyParsedPackages: string[] = [];

  function getRulesRecursive(configuration: string | IConfig) {
    if (!configuration) {
      return;
    }

    let config: IConfig;

    if (typeof configuration === "string") {
      if (alreadyParsedPackages.includes(configuration)) {
        return;
      }

      const pkgNamesToTry = getPossibleNames(configuration);

      for (let i = 0; i < pkgNamesToTry.length; i++) {
        const pkgName = pkgNamesToTry[i];
        try {
          config = require(pkgName);
          alreadyParsedPackages.push(pkgName);
          break;
        } catch (e) {
          if (i === pkgNamesToTry.length - 1) {
            throw new Error(
              `Configuration ${pkgNamesToTry
                .map(name => `"${name}"`)
                .join(" or ")} doesn't found. ${e}`
            );
          }
        }
      }

      if (config.__esModule) {
        config = config.default;
      }
    } else if (
      typeof configuration === "object" &&
      !Array.isArray(configuration)
    ) {
      config = configuration;
    } else {
      throw new Error("Configuration has invalid format");
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
      if (typeof r !== "object" || Array.isArray(r)) {
        throw new Error("Rules has to be a dictionary");
      }

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
  return (
    Object.entries(rules)
      .map(([name, definitions]) => {
        const definition = (compose(
          values,
          mergeAll
        )(definitions) as unknown) as Rule;

        return [name, definitionParser(definition)] as [
          string,
          [number, any, IFunctionRule]
        ];
      })
      // filter undefined functions
      .filter(([, [, , fn]]) => fn)
  );
}
