import config, { IConfig, FunctionRule, Rule } from "./utils/config";
import runner from "./runner";

if (!config) {
  console.log("config not found!");
}

export type Rules = {
  [key: string]: Rule[];
};

interface Swag {
  (any): boolean | string;
  description?: string;
}

export type Implementation = {
  [key: string]: FunctionRule[];
};

const rules: Rules = {};
const implementation: Implementation = {};

const alreadyParsedPackages: string[] = [];

function getAllExtendedRules(configuration?: string) {
  let _config: IConfig;

  if (configuration) {
    if (alreadyParsedPackages.includes(configuration)) {
      return;
    }

    alreadyParsedPackages.push(configuration);

    if (typeof configuration === "string") {
      _config = require(`../../${configuration}`);
      if (_config.__esModule) {
        _config = _config.default;
      }
    } else if (typeof configuration === "object") {
      _config = configuration;
    }
  } else {
    _config = { ...config };
  }

  let { extends: e, rules: r } = _config;

  if (e) {
    if (!Array.isArray(e)) {
      e = [e];
    }

    e.forEach(extend => getAllExtendedRules(extend));
  }

  if (r) {
    Object.entries(r).map(([name, definition]) => {
      if (typeof definition === "function") {
        if (!implementation[name]) {
          implementation[name] = [];
        }
        implementation[name].unshift(definition);
      } else {
        if (!rules[name]) {
          rules[name] = [];
        }
        rules[name].unshift(definition);
      }
    });
  }
}

getAllExtendedRules();
runner(rules, implementation);
