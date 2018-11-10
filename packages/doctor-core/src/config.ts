import * as Cosmiconfig from "cosmiconfig";

const cosmiconfig = Cosmiconfig("doctor");

const { config = null }: { config: IConfig } = cosmiconfig.searchSync() || {};

export default config;
