import { toCamelCase } from "./naming.js";

describe("naming strategy", () => {
  describe("toCamelCase", () => {
    it("converts the text to camel case", () => {
      const tests = [
        ["hello world", "helloWorld"],
        ["hello-world", "helloWorld"]
      ];
      for (const [input, expected] of tests) {
        expect(toCamelCase(input)).toEqual(expected);
      }
    });
  });
});
