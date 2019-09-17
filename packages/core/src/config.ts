import Cosmiconfig from "cosmiconfig";

const cosmiconfig = Cosmiconfig("envdoctor");

export default {
  get: () => {
    const { config = null }: { config?: IConfig } =
      cosmiconfig.searchSync() || {};

    return config;
  }
};
