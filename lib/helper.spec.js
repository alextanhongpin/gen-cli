"use strict";

var _helper = require("./helper");

describe("mergeObject", function () {
  it("merges two objects", function () {
    var a = {
      a: 1
    };
    var b = {
      b: 2
    };
    var expected = {
      a: 1,
      b: 2
    };
    expect((0, _helper.mergeObject)(a, b)).toEqual(expected);
  });
  it("second object replaces the first if the key is the same", function () {
    var a = {
      a: 1
    };
    var b = {
      a: 2,
      b: 3
    };
    var expected = {
      a: 2,
      b: 3
    };
    expect((0, _helper.mergeObject)(a, b)).toEqual(expected);
  });
  it("merges deeply nested object", function () {
    var a = {
      a: {
        b: {
          c: {
            d: "e"
          }
        }
      }
    };
    var b = {
      a: {
        c: {
          d: 100
        }
      }
    };
    var expected = {
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
    expect((0, _helper.mergeObject)(a, b)).toEqual(expected);
  });
  it("concatenates the array if the key is the same", function () {
    var a = {
      a: [1, 2]
    };
    var b = {
      a: [3, 4]
    };
    var expected = {
      a: [1, 2, 3, 4]
    };
    expect((0, _helper.mergeObject)(a, b)).toEqual(expected);
  });
  it("removes duplicates from concatenated array", function () {
    var a = {
      a: [1, 2, 3]
    };
    var b = {
      a: [3, 4, 5]
    };
    var expected = {
      a: [1, 2, 3, 4, 5]
    };
    expect((0, _helper.mergeObject)(a, b)).toEqual(expected);
  });
});