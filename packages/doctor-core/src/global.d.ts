declare enum SEVERITY {
  OK,
  WARN,
  ERROR
}

interface IFunctionRule {
  (parameters: any): boolean | string;
  description?: string;
}

type Rule = SEVERITY | boolean | string | [SEVERITY, any, IFunctionRule];

interface IConfig {
  __esModule?: boolean;
  default?: IConfig;
  extends: string[] | string;
  rules?: {
    [key: string]: Rule | IFunctionRule;
  };
}
