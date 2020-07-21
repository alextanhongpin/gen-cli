import { toKebab, toCamel, toSnake, toPascal } from "./naming";

describe("naming strategy", () => {
  describe("toSnake", () => {
    it("converts the text to snake case", () => {
      const tests = [
        ["foo bar", "foo_bar"],
        ["foo-bar", "foo_bar"],
        ["FOO BAR", "foo_bar"]
      ];
      for (let [input, expected] of tests) {
        expect(toSnake(input)).toEqual(expected);
      }
    });
  });

  describe("toCamel", () => {
    it("converts the text to camel case", () => {
      const tests = [
        ["foo", "foo"],
        ["foo bar", "fooBar"],
        ["foo-bar", "fooBar"],
        ["foo bAR", "fooBAR"],
        ["FOO BAR", "fOOBAR"],
        ["FooBar", "fooBar"]
      ];
      for (const [input, expected] of tests) {
        expect(toCamel(input)).toEqual(expected);
      }
    });
  });

  describe("toKebab", () => {
    it("converts the text to kebab case", () => {
      const tests = [
        ["foo", "foo"],
        ["foo bar", "foo-bar"],
        ["foo-bar", "foo-bar"],
        ["foo bAR", "foo-b-ar"],
        ["FOO BAR", "foo-bar"]
      ];
      for (const [input, expected] of tests) {
        expect(toKebab(input)).toEqual(expected);
      }
    });
  });

  describe("toPascal", () => {
    it("converts the text to pascal case", () => {
      const tests = [
        ["foo", "Foo"],
        ["foo bar", "FooBar"],
        ["foo-bar", "FooBar"],
        ["foo bAR", "FooBar"],
        ["FOO BAR", "FOOBar"],
        ["FooBar", "FooBar"]
      ];
      for (const [input, expected] of tests) {
        expect(toPascal(input)).toEqual(expected);
      }
    });
  });
});
