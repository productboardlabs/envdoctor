export enum SEVERITY {
  OK,
  WARN,
  ERROR
}

export interface FunctionRule {
  (any): boolean | string;
  description?: string;
}

export type Rule = boolean | SEVERITY | string | [number, any];
export interface IConfig {
  __esModule?: boolean;
  default?: IConfig;
  extends: string[] | string;
  rules?: {
    [key: string]: Rule | FunctionRule;
  };
}

const cosmiconfig = require("cosmiconfig")("doctor");

const { config = null }: { config: IConfig } = cosmiconfig.searchSync() || {};

export default config;
