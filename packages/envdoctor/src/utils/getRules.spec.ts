import getRules from "./getRules";

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

it("object based config with extends require", () => {
  expect(
    getRules({
      extends: ["example-package"]
    })
  ).toEqual([["test", [1, "swag", expect.any(Function)]]]);
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
