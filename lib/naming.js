"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toPascal = exports.toCamel = exports.toKebab = exports.toSnake = void 0;
// TODO: Rename to object case, use the package.
var pattern = /[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g;

var toSnake = function toSnake(str) {
  return str && str.match(pattern).map(function (x) {
    return x.toLowerCase();
  }).join("_");
};

exports.toSnake = toSnake;

var toKebab = function toKebab(str) {
  return str && str.match(pattern).map(function (x) {
    return x.toLowerCase();
  }).join("-");
}; //https://stackoverflow.com/questions/2970525/converting-any-string-into-camel-case


exports.toKebab = toKebab;

var toCamel = function toCamel(str) {
  str = str.replace(/[-_\s.]+(.)?/g, function (_, c) {
    return c ? c.toUpperCase() : "";
  });
  return str.substr(0, 1).toLowerCase() + str.substr(1);
};

exports.toCamel = toCamel;

var toPascal = function toPascal(str) {
  return "".concat(str).replace(new RegExp(/[-_]+/, "g"), " ").replace(new RegExp(/[^\w\s]/, "g"), "").replace(new RegExp(/\s+(.)(\w+)/, "g"), function ($1, $2, $3) {
    return "".concat($2.toUpperCase() + $3.toLowerCase());
  }).replace(new RegExp(/\s/, "g"), "").replace(new RegExp(/\w/), function (s) {
    return s.toUpperCase();
  });
};

exports.toPascal = toPascal;