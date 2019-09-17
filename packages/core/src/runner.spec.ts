import { PassThrough as PassThroughStream } from "stream";
import getStream from "get-stream";
import stripAnsi from "strip-ansi";

import runner from "./runner";

it("should throw an error because rule is invalid", async () => {
  const stream = new PassThroughStream();
  const output = getStream(stream);

  await runner(
    [
      [
        "name",
        [
          1,
          null,
          () => {
            throw new Error("lol");
          }
        ]
      ]
    ],
    stream
  );

  stream.end();

  const text = stripAnsi(await output);
  expect(text).toEqual(
    `- name
ℹ Rule "name" has thrown an error: "Error: lol"
`
  );
});

it("should pass one rule", async () => {
  const stream = new PassThroughStream();
  const output = getStream(stream);

  await runner([["name", [1, null, () => true]]], stream);

  stream.end();

  const text = stripAnsi(await output);
  expect(text).toEqual(
    `- name
✔ name
`
  );
});

it("should show warning for one rule", async () => {
  const stream = new PassThroughStream();
  const output = getStream(stream);

  await runner([["name", [1, null, () => false]]], stream);

  stream.end();

  const text = stripAnsi(await output);
  expect(text).toEqual(
    `- name
⚠ name
`
  );
});

it("should show error for one rule", async () => {
  const stream = new PassThroughStream();
  const output = getStream(stream);

  const report = await runner([["name", [2, null, () => false]]], stream);

  expect(report).toEqual({
    errors: ["name"],
    warns: [],
    succeeds: []
  });

  stream.end();

  const text = stripAnsi(await output);
  expect(text).toEqual(
    `- name
✖ name
`
  );
});

it("should pass one rule and show warning for another", async () => {
  const stream = new PassThroughStream();
  const output = getStream(stream);

  const report = await runner(
    [["name", [1, null, () => false]], ["another-one", [2, null, () => true]]],
    stream
  );

  expect(report).toEqual({
    errors: [],
    warns: ["name"],
    succeeds: ["another-one"]
  });

  stream.end();

  const text = stripAnsi(await output);
  expect(text).toEqual(
    `- name
⚠ name
- another-one
✔ another-one
`
  );
});

it("should show custom description and error message", async () => {
  const stream = new PassThroughStream();
  const output = getStream(stream);

  const fn = () => "Custom error";
  fn.description = "Test description";

  await runner([["name", [1, null, fn]]], stream);

  stream.end();

  const text = stripAnsi(await output);
  expect(text).toEqual(
    `- Test description
⚠ Test description: Custom error
`
  );
});

it("should show custom description and error message parameterized", async () => {
  const stream = new PassThroughStream();
  const output = getStream(stream);

  const fn = test => `Custom error ${test}`;
  fn.description = test => `Test description ${test}`;

  await runner([["name", [1, "test", fn]]], stream);

  stream.end();

  const text = stripAnsi(await output);
  expect(text).toEqual(
    `- Test description test
⚠ Test description test: Custom error test
`
  );
});

it("should show custom description and no error", async () => {
  const stream = new PassThroughStream();
  const output = getStream(stream);

  const fn = () => true;
  fn.description = "Test description";

  await runner([["name", [1, null, fn]]], stream);

  stream.end();

  const text = stripAnsi(await output);
  expect(text).toEqual(
    `- Test description
✔ Test description
`
  );
});
