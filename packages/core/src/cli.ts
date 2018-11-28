#!/usr/bin/env node

import runner from "./runner";
import config from "./config";
import { getRules } from "./utils";

const NS_PER_SEC = 1e9;

// https://github.com/facebook/jest/blob/b502c07e4b5f24f491f6bf840bdf298a979ec0e7/packages/jest-cli/src/reporters/utils.js
const pluralize = (word: string, count: number) =>
  `${count} ${word}${count === 1 ? "" : "s"}`;

function reporter({
  errors,
  warns,
  succeeds,
  time
}: {
  errors: string[];
  warns: string[];
  succeeds: string[];
  time: string;
}): void {}

async function cli() {
  const startTime = process.hrtime();

  const configuration = config.get();

  if (!configuration) {
    console.log("Configuration not found. Does '.envdoctorrc' exists?");
  }

  const rules = getRules(configuration);

  const { errors, warns, succeeds } = await runner(rules);

  const diff = process.hrtime(startTime);
  const runtime = (diff[0] + diff[1] / NS_PER_SEC).toFixed(3);

  console.log(
    `
Doctor took ${runtime}s to finish. ${errors.length} errors. ${
      warns.length
    } warnings. ${succeeds.length} successful.`
  );

  if (errors.length > 0) {
    process.exit(1);
  }

  process.exit(0);
}

cli();
