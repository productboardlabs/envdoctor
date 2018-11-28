#!/usr/bin/env node

import chalk from "chalk";
import * as dedent from "dedent";
import runner from "./runner";
import config from "./config";
import { getRules } from "./utils";

const NS_PER_SEC = 1e9;

function reporter({
  report,
  time
}: {
  report: {
    errors: string[];
    warns: string[];
    succeeds: string[];
  };
  time: string;
}): void {
  const total = Object.values(report)
    .map(({ length }) => length)
    .reduce((a, v) => a + v, 0);

  console.log(dedent`
    \n${chalk.bold("Time:")} ${time}s 
    ${chalk.bold("Rules:")} ${chalk.bold.greenBright(
    `${report.succeeds.length} successful`
  )}, ${total} total`);
}

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

  reporter({ report, time: runTime });

  if (report.errors.length > 0) {
    process.exit(1);
  }

  process.exit(0);
}

cli();
