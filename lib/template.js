"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _handlebars = _interopRequireDefault(require("handlebars"));

var _naming = require("./naming.js");

_handlebars["default"].registerHelper("pascalCase", _naming.toPascalCase);

_handlebars["default"].registerHelper("kebabCase", _naming.toKebabCase);

_handlebars["default"].registerHelper("camelCase", _naming.toCamelCase);

_handlebars["default"].registerHelper("snakeCase", _naming.toSnakeCase);

var _default = _handlebars["default"];
exports["default"] = _default;