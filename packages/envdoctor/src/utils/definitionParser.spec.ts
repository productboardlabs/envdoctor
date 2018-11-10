import parser from "./definitionParser";

it("return correct definition based on number (0,1,2)", () => {
  expect(parser(0)).toEqual([0, undefined, undefined]);
  expect(parser(1)).toEqual([1, undefined, undefined]);
  expect(parser(2)).toEqual([2, undefined, undefined]);
  expect(() => parser(3)).toThrowError();
  expect(() => parser(-1)).toThrowError();
});

it("return correct definition based on string (disabled, on, off, warn, error)", () => {
  expect(parser("disabled")).toEqual([0, undefined, undefined]);
  expect(parser("off")).toEqual([0, undefined, undefined]);

  expect(parser("warn")).toEqual([1, undefined, undefined]);

  expect(parser("on")).toEqual([2, undefined, undefined]);
  expect(parser("enabled")).toEqual([2, undefined, undefined]);
  expect(parser("error")).toEqual([2, undefined, undefined]);
});

it("return correct definition based on array with number", () => {
  expect(parser([0])).toEqual([0, undefined, undefined]);
  expect(parser([1])).toEqual([1, undefined, undefined]);
  expect(parser([2])).toEqual([2, undefined, undefined]);
  expect(() => parser([3])).toThrowError();
  expect(() => parser([-1])).toThrowError();
});

it("return correct definition based on boolean", () => {
  expect(parser(false)).toEqual([0, undefined, undefined]);
  expect(parser(true)).toEqual([2, undefined, undefined]);
  expect(parser([true])).toEqual([2, undefined, undefined]);
  expect(parser([false])).toEqual([0, undefined, undefined]);
});

it("return correct definition based on array with string", () => {
  expect(parser(["on"])).toEqual([2, undefined, undefined]);
  expect(parser(["off"])).toEqual([0, undefined, undefined]);
  expect(parser(["warn"])).toEqual([1, undefined, undefined]);
  expect(parser(["disabled"])).toEqual([0, undefined, undefined]);
});

it("return correct definition with full format", () => {
  expect(parser(["on", "lol"])).toEqual([2, "lol", undefined]);
  expect(parser(["off", { lol: "wtf" }])).toEqual([
    0,
    { lol: "wtf" },
    undefined
  ]);
  expect(parser([1, { ok: "nice" }])).toEqual([1, { ok: "nice" }, undefined]);

  const fn = () => true;

  expect(parser([1, { ok: "nice" }, fn])).toEqual([1, { ok: "nice" }, fn]);
});
