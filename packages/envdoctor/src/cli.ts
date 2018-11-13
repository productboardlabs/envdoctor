#!/usr/bin/env node

import runner from "./runner";
import config from "./config";
import { getRules } from "./utils";

const configuration = config.get();

if (!configuration) {
  console.log("Configuration not found. Does '.envdoctorrc' exists?");
}

const rules = getRules(configuration);

runner(rules);
