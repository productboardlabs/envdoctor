interface IFunctionRule {
  (parameters: any): boolean | string;
  description?: string | ((any) => string);
}

type Rule =
  | boolean
  | number
  | string
  | [boolean | number | string, any?, IFunctionRule?];

type NormalizedRule = [number, any?, IFunctionRule?];

interface IRules {
  [key: string]: Rule[];
}

interface IConfig {
  __esModule?: boolean;
  default?: IConfig;
  extends?: Array<string | IConfig> | string;
  rules?: {
    [key: string]: Rule | IFunctionRule;
  };
}
