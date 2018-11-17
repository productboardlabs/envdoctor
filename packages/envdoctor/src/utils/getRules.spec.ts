import getRules, { getPossibleNames } from "./getRules";

it("null should return [] rules", () => {
  expect(getRules(null)).toEqual([]);
});

it("object based config should return correctly normalized rules", () => {
  expect(
    getRules({
      rules: {
        simple: () => true
      }
    })
  ).toEqual([["simple", [2, undefined, expect.any(Function)]]]);
});

it("object based config should return correctly normalized rules", () => {
  expect(() =>
    getRules({
      rules: ["wrong-example"]
    })
  ).toThrowError(/Rules has to be a dictionary/);
});

it("object based config with extends require filter invalid rule", () => {
  expect(
    getRules({
      extends: ["example-package"],
      rules: {
        fail: [2]
      }
    })
  ).toEqual([["test", [1, "swag", expect.any(Function)]]]);
});

it("object based config with extends require which calls itself should prevent infinite cycle", () => {
  expect(
    getRules({
      extends: ["bad-package"]
    })
  ).toEqual([["test", [1, "low-swag", expect.any(Function)]]]);
});

it("object based config with extends require which calls itself should prevent infinite cycle", () => {
  expect(
    getRules({
      extends: ["@scoped/another-package"]
    })
  ).toEqual([["test", [1, "swag", expect.any(Function)]]]);
});

it("object based config with extends require", () => {
  expect(() =>
    getRules({
      extends: ["not-found"]
    })
  ).toThrowError(
    /Configuration "envdoctor-config-not-found" or "not-found" doesn't found. Error: Cannot find module 'not-found' from 'getRules.ts'/
  );
});

it("object based config with extends require, with disabled rule", () => {
  expect(
    getRules({
      extends: ["example-package"],
      rules: {
        test: "off"
      }
    })
  ).toEqual([["test", [0, "swag", expect.any(Function)]]]);
});

it("object based config with extends require, using prefix", () => {
  expect(
    getRules({
      extends: ["example"] // envdoctor-config-example
    })
  ).toEqual([["test", [1, "swag", expect.any(Function)]]]);
});

it("object based config with extends require, using scoped prefix", () => {
  expect(
    getRules({
      extends: ["@scoped/example"] // @scoped/envdoctor-config-example
    })
  ).toEqual([["test", [1, "swag", expect.any(Function)]]]);
});

it("object based config with extends require, using just scope", () => {
  expect(
    getRules({
      extends: ["@scoped"] // @scoped/envdoctor-config
    })
  ).toEqual([["test", [1, "swag", expect.any(Function)]]]);
});

it("get possible names", () => {
  expect(getPossibleNames("config")).toEqual([
    "envdoctor-config-config",
    "config"
  ]);
});

it("get possible scoped names", () => {
  expect(getPossibleNames("@jukben")).toEqual(["@jukben/envdoctor-config"]);
});

it("get possible scoped names extended", () => {
  expect(getPossibleNames("@jukben/lol")).toEqual([
    "@jukben/envdoctor-config-lol",
    "@jukben/lol"
  ]);
});

it("get possible names with special chars", () => {
  expect(getPossibleNames("config-test")).toEqual([
    "envdoctor-config-config-test",
    "config-test"
  ]);
});

it("get possible scoped names extended with special chars", () => {
  expect(getPossibleNames("@jukben/example-test")).toEqual([
    "@jukben/envdoctor-config-example-test",
    "@jukben/example-test"
  ]);
});
