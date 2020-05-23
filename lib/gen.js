"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _fs = _interopRequireDefault(require("fs"));

var _chalk = _interopRequireDefault(require("chalk"));

var _path = _interopRequireDefault(require("path"));

var _treeify = _interopRequireDefault(require("treeify"));

var _inquirer = _interopRequireDefault(require("inquirer"));

var _helper = require("./helper.js");

var _template2 = _interopRequireDefault(require("./template.js"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _createForOfIteratorHelper(o) { if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (o = _unsupportedIterableToArray(o))) { var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var it, normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var fsPromises = _fs["default"].promises;
var utf8 = {
  encoding: "utf8"
};

var cwd = function cwd() {
  for (var _len = arguments.length, paths = new Array(_len), _key = 0; _key < _len; _key++) {
    paths[_key] = arguments[_key];
  }

  return _path["default"].resolve.apply(_path["default"], [process.cwd()].concat(paths));
};

var FileStatus = {
  CREATED: _chalk["default"].green("(created)"),
  EXISTS: _chalk["default"].red("(exists)")
};

function open(_x) {
  return _open.apply(this, arguments);
}

function _open() {
  _open = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(target) {
    var flag,
        _map,
        _map2,
        dir,
        file,
        fileHandle,
        _args = arguments;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            flag = _args.length > 1 && _args[1] !== undefined ? _args[1] : "w+";
            _map = [_path["default"].dirname, _path["default"].basename].map(function (fn) {
              return fn(target);
            }), _map2 = (0, _slicedToArray2["default"])(_map, 2), dir = _map2[0], file = _map2[1];
            _context.next = 4;
            return fsPromises.mkdir(cwd(dir), {
              recursive: true
            });

          case 4:
            _context.next = 6;
            return fsPromises.open(cwd(dir, file), flag);

          case 6:
            fileHandle = _context.sent;
            return _context.abrupt("return", fileHandle);

          case 8:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _open.apply(this, arguments);
}

function gen() {
  return _gen.apply(this, arguments);
}

function _gen() {
  _gen = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
    var configPath,
        commandType,
        name,
        config,
        command,
        prompts,
        actions,
        answers,
        templateTree,
        destinationTree,
        _iterator,
        _step,
        action,
        data,
        template,
        destination,
        content,
        templatePath,
        templatePaths,
        destinationPath,
        destinationPaths,
        _template,
        _destination,
        _args2 = arguments;

    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            configPath = _args2.length > 0 && _args2[0] !== undefined ? _args2[0] : "config.json";
            commandType = _args2.length > 1 ? _args2[1] : undefined;
            name = _args2.length > 2 ? _args2[2] : undefined;
            config = require(cwd(configPath));
            command = config[commandType];

            if (command) {
              _context2.next = 7;
              break;
            }

            throw new Error("Command \"".concat(commandType, " is not specified in the config.json\""));

          case 7:
            prompts = command.prompts, actions = command.actions;

            if (!prompts) {
              _context2.next = 14;
              break;
            }

            _context2.next = 11;
            return _inquirer["default"].prompt(prompts);

          case 11:
            _context2.t0 = _context2.sent;
            _context2.next = 15;
            break;

          case 14:
            _context2.t0 = {};

          case 15:
            answers = _context2.t0;
            templateTree = {};
            destinationTree = {}; // Payload data.

            _iterator = _createForOfIteratorHelper(actions);
            _context2.prev = 19;

            _iterator.s();

          case 21:
            if ((_step = _iterator.n()).done) {
              _context2.next = 68;
              break;
            }

            action = _step.value;
            data = _objectSpread(_objectSpread({
              name: name,
              command: commandType
            }, answers), action.data);
            template = void 0;
            destination = void 0;
            content = "";
            templatePath = _template2["default"].compile(action.template)(data);
            templatePaths = templatePath.split("/");
            destinationPath = _template2["default"].compile(action.destination)(data);
            destinationPaths = destinationPath.split("/");
            _context2.prev = 31;
            _context2.next = 34;
            return open(templatePath, "a+");

          case 34:
            template = _context2.sent;
            _context2.next = 37;
            return template.readFile(utf8);

          case 37:
            content = _context2.sent;
            templatePaths.push(content.length ? FileStatus.CREATED : FileStatus.EXISTS);
            _context2.next = 44;
            break;

          case 41:
            _context2.prev = 41;
            _context2.t1 = _context2["catch"](31);
            templatePaths.push(_chalk["default"].red("(exists)"));

          case 44:
            _context2.prev = 44;
            (_template = template) === null || _template === void 0 ? void 0 : _template.close();
            templateTree = (0, _helper.mergeObject)(templateTree, (0, _helper.toObject)(templatePaths));
            return _context2.finish(44);

          case 48:
            if (content.trim().length) {
              _context2.next = 50;
              break;
            }

            return _context2.abrupt("continue", 66);

          case 50:
            _context2.prev = 50;
            _context2.next = 53;
            return open(destinationPath, "wx+");

          case 53:
            destination = _context2.sent;
            _context2.next = 56;
            return destination.writeFile(_template2["default"].compile(content)(data), utf8);

          case 56:
            destinationPaths.push(FileStatus.CREATED);
            _context2.next = 62;
            break;

          case 59:
            _context2.prev = 59;
            _context2.t2 = _context2["catch"](50);
            destinationPaths.push(FileStatus.EXISTS);

          case 62:
            _context2.prev = 62;
            (_destination = destination) === null || _destination === void 0 ? void 0 : _destination.close();
            destinationTree = (0, _helper.mergeObject)(destinationTree, (0, _helper.toObject)(destinationPaths));
            return _context2.finish(62);

          case 66:
            _context2.next = 21;
            break;

          case 68:
            _context2.next = 73;
            break;

          case 70:
            _context2.prev = 70;
            _context2.t3 = _context2["catch"](19);

            _iterator.e(_context2.t3);

          case 73:
            _context2.prev = 73;

            _iterator.f();

            return _context2.finish(73);

          case 76:
            printTree(templateTree, "Generated templates");
            printTree(destinationTree, "Generated codes");

          case 78:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[19, 70, 73, 76], [31, 41, 44, 48], [50, 59, 62, 66]]);
  }));
  return _gen.apply(this, arguments);
}

function printTree() {
  var tree = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var msg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
  if (!(0, _helper.isObject)(tree)) return;

  if (Object.keys(tree).length) {
    console.log(_chalk["default"].blue(msg));
    console.log(_treeify["default"].asTree(tree, true));
  }
}

var _default = gen;
exports["default"] = _default;