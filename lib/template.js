"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _handlebars = _interopRequireDefault(require("handlebars"));

var _naming = require("./naming.js");

_handlebars["default"].registerHelper("pascalCase", _naming.toPascal);

_handlebars["default"].registerHelper("kebabCase", _naming.toKebab);

_handlebars["default"].registerHelper("camelCase", _naming.toCamel);

_handlebars["default"].registerHelper("snakeCase", _naming.toSnake);

var _default = _handlebars["default"];
exports["default"] = _default;