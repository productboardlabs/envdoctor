import runner from "./runner";
import config from "./config";

if (!config) {
  console.log("config not found!");
}

export interface IRules {
  [key: string]: Rule[];
}

export interface Implementations {
  [key: string]: IFunctionRule[];
}

export enum SEVERITY {
  OK,
  WARN,
  ERROR
}

const rules: IRules = {};
const implementation: Implementations = {};

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
