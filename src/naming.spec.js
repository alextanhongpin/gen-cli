import { toKebabCase, toCamelCase, toSnakeCase, toPascalCase } from "./naming";
import { toObject } from "./helper";

describe("naming strategy", () => {
  describe("toSnakeCase", () => {
    it("converts the text to snake case", () => {
      const tests = [
        ["foo bar", "foo_bar"],
        ["foo-bar", "foo_bar"],
        ["FOO BAR", "foo_bar"]
      ];
      for (let [input, expected] of tests) {
        expect(toSnakeCase(input)).toEqual(expected);
      }
    });
  });

  describe("toCamelCase", () => {
    it("converts the text to camel case", () => {
      const tests = [
        ["foo", "foo"],
        ["foo bar", "fooBar"],
        ["foo-bar", "fooBar"],
        ["foo bAR", "fooBar"],
        ["FOO BAR", "fooBar"]
      ];
      for (const [input, expected] of tests) {
        expect(toCamelCase(input)).toEqual(expected);
      }
    });
  });

  describe("toKebabCase", () => {
    it("converts the text to kebab case", () => {
      const tests = [
        ["foo", "foo"],
        ["foo bar", "foo-bar"],
        ["foo-bar", "foo-bar"],
        ["foo bAR", "foo-b-ar"],
        ["FOO BAR", "foo-bar"]
      ];
      for (const [input, expected] of tests) {
        expect(toKebabCase(input)).toEqual(expected);
      }
    });
  });

  describe("toPascalCase", () => {
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
        expect(toPascalCase(input)).toEqual(expected);
      }
    });
  });

  it("concatenates the keys as object", () => {
    const keys = ["a", "b", "c"];
    expect(toObject(keys)).toEqual({
      a: {
        b: {
          c: undefined
        }
      }
    });
  });
});
