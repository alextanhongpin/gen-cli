"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _naming = require("./naming");

var _helper = require("./helper");

describe("naming strategy", function () {
  describe("toSnakeCase", function () {
    it("converts the text to snake case", function () {
      var tests = [["foo bar", "foo_bar"], ["foo-bar", "foo_bar"], ["FOO BAR", "foo_bar"]];

      for (var _i = 0, _tests = tests; _i < _tests.length; _i++) {
        var _tests$_i = (0, _slicedToArray2["default"])(_tests[_i], 2),
            input = _tests$_i[0],
            expected = _tests$_i[1];

        expect((0, _naming.toSnakeCase)(input)).toEqual(expected);
      }
    });
  });
  describe("toCamelCase", function () {
    it("converts the text to camel case", function () {
      var tests = [["foo", "foo"], ["foo bar", "fooBar"], ["foo-bar", "fooBar"], ["foo bAR", "fooBar"], ["FOO BAR", "fooBar"]];

      for (var _i2 = 0, _tests2 = tests; _i2 < _tests2.length; _i2++) {
        var _tests2$_i = (0, _slicedToArray2["default"])(_tests2[_i2], 2),
            input = _tests2$_i[0],
            expected = _tests2$_i[1];

        expect((0, _naming.toCamelCase)(input)).toEqual(expected);
      }
    });
  });
  describe("toKebabCase", function () {
    it("converts the text to kebab case", function () {
      var tests = [["foo", "foo"], ["foo bar", "foo-bar"], ["foo-bar", "foo-bar"], ["foo bAR", "foo-b-ar"], ["FOO BAR", "foo-bar"]];

      for (var _i3 = 0, _tests3 = tests; _i3 < _tests3.length; _i3++) {
        var _tests3$_i = (0, _slicedToArray2["default"])(_tests3[_i3], 2),
            input = _tests3$_i[0],
            expected = _tests3$_i[1];

        expect((0, _naming.toKebabCase)(input)).toEqual(expected);
      }
    });
  });
  describe("toPascalCase", function () {
    it("converts the text to pascal case", function () {
      var tests = [["foo", "Foo"], ["foo bar", "FooBar"], ["foo-bar", "FooBar"], ["foo bAR", "FooBar"], ["FOO BAR", "FOOBar"], ["FooBar", "FooBar"]];

      for (var _i4 = 0, _tests4 = tests; _i4 < _tests4.length; _i4++) {
        var _tests4$_i = (0, _slicedToArray2["default"])(_tests4[_i4], 2),
            input = _tests4$_i[0],
            expected = _tests4$_i[1];

        expect((0, _naming.toPascalCase)(input)).toEqual(expected);
      }
    });
  });
  it("concatenates the keys as object", function () {
    var keys = ["a", "b", "c"];
    expect((0, _helper.toObject)(keys)).toEqual({
      a: {
        b: {
          c: undefined
        }
      }
    });
  });
});