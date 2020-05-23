"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toObject = exports.mergeObject = exports.isArray = exports.isObject = void 0;

var _toArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toArray"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var isObject = function isObject(o) {
  return o === Object(o) && !Array.isArray(o);
};

exports.isObject = isObject;

var isArray = function isArray(arr) {
  return Array.isArray(arr);
};

exports.isArray = isArray;

var mergeObject = function mergeObject() {
  var o = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var tgt = _objectSpread({}, o);

  for (var _len = arguments.length, rest = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    rest[_key - 1] = arguments[_key];
  }

  if (!rest.length) return tgt;
  var src = rest.shift();

  for (var key in src) {
    if (isObject(tgt[key]) && isObject(src[key])) {
      tgt[key] = mergeObject(tgt[key], src[key]);
    } else if (isArray(tgt[key]) && isArray(src[key])) {
      tgt[key] = (0, _toConsumableArray2["default"])(new Set([].concat((0, _toConsumableArray2["default"])(tgt[key]), (0, _toConsumableArray2["default"])(src[key]))));
    } else {
      tgt[key] = src[key];
    }
  }

  return mergeObject.apply(void 0, [tgt].concat(rest));
};

exports.mergeObject = mergeObject;

var toObject = function toObject(keys) {
  if (keys.length === 1) return keys[0];
  var o = {};

  var _keys = (0, _toArray2["default"])(keys),
      head = _keys[0],
      rest = _keys.slice(1);

  o[head] = toObject(rest);
  return o;
};

exports.toObject = toObject;