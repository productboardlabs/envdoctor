#!/usr/bin/env node

import runner from "./runner";
import config from "./config";
import reporter from "./utils/reporter";
import { getRules } from "./utils";

const NS_PER_SEC = 1e9;

async function cli() {
  const startTime = process.hrtime();

  const configuration = config.get();

  if (!configuration) {
    console.log("Configuration not found. Does '.envdoctorrc' exists?");
  }

  const rules = getRules(configuration);

  const report = await runner(rules);

  const timeDiff = process.hrtime(startTime);
  const runTime = (timeDiff[0] + timeDiff[1] / NS_PER_SEC).toFixed(3);

  const returnCode = reporter({ report, time: runTime });

  process.exit(returnCode);
}

cli();
