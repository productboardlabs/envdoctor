#!/usr/bin/env node

import * as updateNotifier from "update-notifier";
import * as minimist from "minimist";
import * as dedent from "dedent";
import runner from "./runner";
import config from "./config";
import reporter from "./utils/reporter";
import { getRules } from "./utils";

const pkg = require("../package.json");
const NS_PER_SEC = 1e9;

updateNotifier({ pkg }).notify();

async function runDoctor() {
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

function printHelp() {
  console.log(dedent`
👩‍⚕️ The framework for various tests / checks in the current environment. 

For correct function, make sure that you provide configuration (default .envdoctorrc file)

Usage
  
$ yarn run envdoctor 

Options
  --help, -h         Print this help
  --version, -v      Print the version
`);
}

function printVersion() {
  console.log(pkg.version);
}

const args = minimist(process.argv.slice(2), {
  boolean: ["help", "version"],
  alias: {
    h: "help",
    v: "version"
  }
});

if (args.help) {
  printHelp();
} else if (args.version) {
  printVersion();
} else {
  runDoctor();
}
