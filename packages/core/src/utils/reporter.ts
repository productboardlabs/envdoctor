import chalk from "chalk";
import * as dedent from "dedent";

export default function reporter({
  report,
  time
}: {
  report: {
    errors: string[];
    warns: string[];
    succeeds: string[];
  };
  time: string;
}): number {
  const total = Object.values(report)
    .map(({ length }) => length)
    .reduce((a, v) => a + v, 0);

  console.log(dedent`
    \n${chalk.bold("Time:")} ${time}s 
    ${chalk.bold("Rules:")} ${chalk.bold.greenBright(
    `${report.succeeds.length} successful`
  )}${
    report.errors.length > 0
      ? `, ${chalk.bold.redBright(`${report.errors.length} failed`)}`
      : ""
  }, ${total} total`);

  // exit correct return code based on absence of errors
  return +(report.errors.length > 0);
}
