#!/usr/bin/env node
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _chalk = _interopRequireDefault(require("chalk"));

var _clear = _interopRequireDefault(require("clear"));

var _figlet = _interopRequireDefault(require("figlet"));

var _path = _interopRequireDefault(require("path"));

var _commander = _interopRequireDefault(require("commander"));

var _gen = _interopRequireDefault(require("./gen.js"));

var program = _commander["default"].program;
(0, _clear["default"])();
console.log(_chalk["default"].green(_figlet["default"].textSync("gen-cli", {
  horizontalLayout: "full"
})));
program.version("0.0.1").description("Code generation for JavaScript").option("-c, --config <type>", "Path to config file");
program.command("g <type> <name>").description("generates the file for the given type").action(function (type, name) {
  try {
    (0, _gen["default"])(program.config, type, name);
  } catch (error) {
    console.log(_chalk["default"].red(error.message));
  }
});
program.parse(process.argv);

if (!process.argv.slice(2).length) {
  program.outputHelp();
}