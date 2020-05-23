import { mergeObject } from "./object";

describe("mergeObject", () => {
  it("merges two objects", () => {
    const a = {
      a: 1
    };
    const b = {
      b: 2
    };
    const expected = {
      a: 1,
      b: 2
    };
    expect(mergeObject(a, b)).toEqual(expected);
  });

  it("second object replaces the first if the key is the same", () => {
    const a = {
      a: 1
    };
    const b = {
      a: 2,
      b: 3
    };
    const expected = {
      a: 2,
      b: 3
    };
    expect(mergeObject(a, b)).toEqual(expected);
  });

  it("merges deeply nested object", () => {
    const a = {
      a: {
        b: {
          c: {
            d: "e"
          }
        }
      }
    };
    const b = {
      a: {
        c: {
          d: 100
        }
      }
    };
    const expected = {
      a: {
        b: {
          c: {
            d: "e"
          }
        },
        c: {
          d: 100
        }
      }
    };
    expect(mergeObject(a, b)).toEqual(expected);
  });

  it("concatenates the array if the key is the same", () => {
    const a = {
      a: [1, 2]
    };
    const b = {
      a: [3, 4]
    };
    const expected = {
      a: [1, 2, 3, 4]
    };
    expect(mergeObject(a, b)).toEqual(expected);
  });

  it("removes duplicates from concatenated array", () => {
    const a = {
      a: [1, 2, 3]
    };
    const b = {
      a: [3, 4, 5]
    };
    const expected = {
      a: [1, 2, 3, 4, 5]
    };
    expect(mergeObject(a, b)).toEqual(expected);
  });
});
