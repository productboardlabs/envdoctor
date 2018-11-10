import runner from "./runner";
import mainConfig from "./config";
import { definitionParser } from "./utils";
import { mergeAll, compose, values } from "ramda";

if (!mainConfig) {
  console.log("config not found!");
}

export interface IRules {
  [key: string]: Rule[];
}

export interface Implementations {
  [key: string]: IFunctionRule[];
}

export enum SEVERITY {
  OFF,
  WARN,
  ERROR
}

const rules: IRules = {};
const alreadyParsedPackages: string[] = [];

function getAllExtendedRules(configuration: string | IConfig = mainConfig) {
  let config: IConfig;

  if (configuration) {
    if (typeof configuration === "string") {
      if (alreadyParsedPackages.includes(configuration)) {
        return;
      }

      alreadyParsedPackages.push(configuration);

      config = require(`../../${configuration}`);
      if (config.__esModule) {
        config = config.default;
      }
    } else if (typeof configuration === "object") {
      config = configuration;
    }
  } else {
    config = { ...config };
  }

  let { extends: e, rules: r } = config;

  if (e) {
    if (!Array.isArray(e)) {
      e = [e];
    }

    e.forEach(extend => getAllExtendedRules(extend));
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

getAllExtendedRules();

const normalizedRules = Object.entries(rules).map(([name, definitions]) => {
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

runner(normalizedRules);
