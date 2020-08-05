import { ext } from "./file";

describe("extension", () => {
  test.each([
    ["hello.md", ".md"], // File.
    ["/main/hello.md", ".md"], // Absolute path.
    ["../../main.js", ".js"] // Relative path.
  ])('ext("%s") returns "%s"', (file, expected) => {
    expect(ext(file)).toEqual(expected);
  });
});
