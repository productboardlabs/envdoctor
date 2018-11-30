import versionComparator, { COMPARISON } from "./versionComparator";

it("should throw an fatal error", () => {
  expect(() => versionComparator()).toThrow();
  expect(() => versionComparator({ comparator: COMPARISON.EQ })).toThrow();
  expect(() => versionComparator({ version: "8" })).toThrow();
});

it("eq should work", () => {
  expect(
    versionComparator(
      {
        comparator: COMPARISON.EQ,
        version: "8"
      },
      "8"
    )
  ).toEqual(true);
});

it("eq should thrown an error", () => {
  expect(
    versionComparator(
      {
        comparator: COMPARISON.EQ,
        version: "8"
      },
      "7"
    )
  ).toEqual("8 is required, 7 is installed");
});

it("gt should work", () => {
  expect(
    versionComparator(
      {
        comparator: COMPARISON.GT,
        version: "8"
      },
      "9"
    )
  ).toEqual(true);
});

it("gt should thrown an error", () => {
  expect(
    versionComparator(
      {
        comparator: COMPARISON.GT,
        version: "10"
      },
      "9"
    )
  ).toEqual("Greater version than 10 is required, 9 is installed");
});

it("gte should work", () => {
  expect(
    versionComparator(
      {
        comparator: COMPARISON.GTE,
        version: "9"
      },
      "9"
    )
  ).toEqual(true);
});

it("gte should thrown an error", () => {
  expect(
    versionComparator(
      {
        comparator: COMPARISON.GTE,
        version: "10"
      },
      "9"
    )
  ).toEqual("10 or greater version  is required, 9 is installed");
});

it("lt should work", () => {
  expect(
    versionComparator(
      {
        comparator: COMPARISON.LT,
        version: "10"
      },
      "9"
    )
  ).toEqual(true);
});

it("lt should throw an error", () => {
  expect(
    versionComparator(
      {
        comparator: COMPARISON.LT,
        version: "9"
      },
      "10"
    )
  ).toEqual("Lower version than 9 is required, 10 is installed");
});

it("lte should work", () => {
  expect(
    versionComparator(
      {
        comparator: COMPARISON.LTE,
        version: "10"
      },
      "10"
    )
  ).toEqual(true);
});

it("lte should work throw an error", () => {
  expect(
    versionComparator(
      {
        comparator: COMPARISON.LTE,
        version: "9"
      },
      "10"
    )
  ).toEqual("9 or lower is required, 10 is installed");
});
