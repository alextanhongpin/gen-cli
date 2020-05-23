"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ext = exports.load = exports.open = exports.resolve = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

var cwd = process.cwd();

var resolve = function resolve() {
  for (var _len = arguments.length, paths = new Array(_len), _key = 0; _key < _len; _key++) {
    paths[_key] = arguments[_key];
  }

  return _path["default"].resolve.apply(_path["default"], [cwd].concat(paths));
};

exports.resolve = resolve;

var open = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(file) {
    var flag,
        _args = arguments;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            flag = _args.length > 1 && _args[1] !== undefined ? _args[1] : "w+";
            _context.next = 3;
            return _fs["default"].promises.mkdir(resolve(_path["default"].dirname(file)), {
              recursive: true
            });

          case 3:
            return _context.abrupt("return", _fs["default"].promises.open(resolve(file), flag));

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function open(_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.open = open;

var load = function load(file) {
  return require(resolve(file));
};

exports.load = load;

var ext = function ext(file) {
  return _path["default"].extname(_path["default"].basename(file));
};

exports.ext = ext;