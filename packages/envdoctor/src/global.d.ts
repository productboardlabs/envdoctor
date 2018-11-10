interface IFunctionRule {
  (parameters: any): boolean | string;
  description?: string | ((any) => string);
}

type Rule =
  | boolean
  | number
  | string
  | [boolean | number | string, any?, IFunctionRule?];

interface IConfig {
  __esModule?: boolean;
  default?: IConfig;
  extends: string[] | string;
  rules?: {
    [key: string]: Rule | IFunctionRule;
  };
}