#!/usr/bin/env node
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _chalk = _interopRequireDefault(require("chalk"));

var _clear = _interopRequireDefault(require("clear"));

var _commander = _interopRequireDefault(require("commander"));

var _figlet = _interopRequireDefault(require("figlet"));

var _path = _interopRequireDefault(require("path"));

var _gen = require("./gen.js");

require("json5/lib/register");

var program = _commander["default"].program;
(0, _clear["default"])();
console.log(_chalk["default"].green(_figlet["default"].textSync("gen-cli", {
  horizontalLayout: "full"
})));
program.version("0.0.1").description("Code generation for JavaScript").option("-c, --config <type>", "Path to config file").option("-d, --dry-run", "Print out template instead of writing to file");
program.command("g <type> <name>").description("generates the file for the given type").action( /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(type, name) {
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return (0, _gen.gen)(program, type, name);

          case 3:
            _context.next = 8;
            break;

          case 5:
            _context.prev = 5;
            _context.t0 = _context["catch"](0);
            console.log(_chalk["default"].red(_context.t0.message));

          case 8:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 5]]);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());
program.command("init").description("generate sample config file").action( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
  return _regenerator["default"].wrap(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return (0, _gen.createConfig)();

        case 3:
          console.log(_chalk["default"].green("created config.json"));
          console.log(_chalk["default"].blue("Run '$ gen g my_service MyService' to generate your first template!"));
          _context2.next = 10;
          break;

        case 7:
          _context2.prev = 7;
          _context2.t0 = _context2["catch"](0);
          _context2.t0.code === "EEXIST" ? console.log(_chalk["default"].red("config.json already exists")) : console.log(_chalk["default"].red(_context2.t0.message));

        case 10:
        case "end":
          return _context2.stop();
      }
    }
  }, _callee2, null, [[0, 7]]);
})));
program.parse(process.argv);

if (!process.argv.slice(2).length) {
  program.outputHelp();
}