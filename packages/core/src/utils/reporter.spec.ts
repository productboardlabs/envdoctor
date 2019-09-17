import stripAnsi from "strip-ansi";
import reporter from "./reporter";

const log = console.log;

beforeEach(() => {
  console.log = jest.fn();
});

afterEach(() => {
  console.log = log;
});

it("should print time and passed rules with error", () => {
  console.log = jest.fn();

  const returnCode = reporter({
    report: {
      errors: ["error-rule"],
      warns: ["warn-rule"],
      succeeds: ["succeeds-rule"]
    },
    time: "0.3"
  });

  expect(returnCode).toEqual(1);

  expect(stripAnsi(console.log.mock.calls.join())).toEqual(`
Time: 0.3s 
Rules: 1 successful, 1 failed, 3 total`);
});

it("should print time and passed rules without error", () => {
  console.log = jest.fn();

  const returnCode = reporter({
    report: {
      errors: [],
      warns: ["warn-rule"],
      succeeds: ["succeeds-rule"]
    },
    time: "0.3"
  });

  expect(returnCode).toEqual(0);

  expect(stripAnsi(console.log.mock.calls.join())).toEqual(`
Time: 0.3s 
Rules: 1 successful, 2 total`);
});
