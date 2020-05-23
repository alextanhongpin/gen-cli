"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toPascalCase = exports.toCamelCase = exports.toKebabCase = exports.toSnakeCase = void 0;
var pattern = /[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g;

var toSnakeCase = function toSnakeCase(str) {
  return str && str.match(pattern).map(function (x) {
    return x.toLowerCase();
  }).join("_");
};

exports.toSnakeCase = toSnakeCase;

var toKebabCase = function toKebabCase(str) {
  return str && str.match(pattern).map(function (x) {
    return x.toLowerCase();
  }).join("-");
};

exports.toKebabCase = toKebabCase;

var toCamelCase = function toCamelCase(str) {
  return str.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, function (m, chr) {
    return chr.toUpperCase();
  });
};

exports.toCamelCase = toCamelCase;

var toPascalCase = function toPascalCase(str) {
  return "".concat(str).replace(new RegExp(/[-_]+/, "g"), " ").replace(new RegExp(/[^\w\s]/, "g"), "").replace(new RegExp(/\s+(.)(\w+)/, "g"), function ($1, $2, $3) {
    return "".concat($2.toUpperCase() + $3.toLowerCase());
  }).replace(new RegExp(/\s/, "g"), "").replace(new RegExp(/\w/), function (s) {
    return s.toUpperCase();
  });
};

exports.toPascalCase = toPascalCase;