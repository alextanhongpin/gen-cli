"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.gen = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _chalk = _interopRequireDefault(require("chalk"));

var _treeify = _interopRequireDefault(require("treeify"));

var _inquirer = _interopRequireDefault(require("inquirer"));

var _path = _interopRequireDefault(require("path"));

var _template2 = _interopRequireDefault(require("./template.js"));

var _file = require("./file");

var _object = require("./object.js");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _createForOfIteratorHelper(o) { if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (o = _unsupportedIterableToArray(o))) { var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var it, normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var UTF8 = {
  encoding: "utf8"
};
var FileStatus = {
  CREATED: _chalk["default"].green("(created)"),
  EXISTS: _chalk["default"].red("(exists)")
};

var gen = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
    var configPath,
        commandType,
        name,
        config,
        command,
        prompts,
        actions,
        answers,
        templateStatus,
        destinationStatus,
        _iterator,
        _step,
        action,
        data,
        template,
        destination,
        content,
        templatePath,
        destinationPath,
        _template,
        _destination,
        _args = arguments;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            configPath = _args.length > 0 && _args[0] !== undefined ? _args[0] : "config.json";
            commandType = _args.length > 1 ? _args[1] : undefined;
            name = _args.length > 2 ? _args[2] : undefined;
            config = (0, _file.load)(configPath); // Allow extending of handlebars if a config.js file is loaded.

            _context.t0 = (0, _file.ext)(configPath);
            _context.next = _context.t0 === ".js" ? 7 : 10;
            break;

          case 7:
            if (config.handlebars && typeof config.handlebars === "function") {
              config.handlebars(_template2["default"]);
            }

            delete config.handlebars;
            return _context.abrupt("break", 10);

          case 10:
            command = config[commandType];

            if (command) {
              _context.next = 13;
              break;
            }

            throw new Error("Command \"".concat(commandType, " is not specified in the ").concat(configPath, "\""));

          case 13:
            prompts = command.prompts, actions = command.actions;

            if (!prompts) {
              _context.next = 20;
              break;
            }

            _context.next = 17;
            return _inquirer["default"].prompt(prompts);

          case 17:
            _context.t1 = _context.sent;
            _context.next = 21;
            break;

          case 20:
            _context.t1 = {};

          case 21:
            answers = _context.t1;
            templateStatus = {};
            destinationStatus = {};
            _iterator = _createForOfIteratorHelper(actions);
            _context.prev = 25;

            _iterator.s();

          case 27:
            if ((_step = _iterator.n()).done) {
              _context.next = 70;
              break;
            }

            action = _step.value;
            data = _objectSpread(_objectSpread({
              name: name,
              command: commandType
            }, answers), action.data);
            template = void 0;
            destination = void 0;
            content = ""; // Read from template and write to destination.

            templatePath = _template2["default"].compile(action.template)(data);
            destinationPath = _template2["default"].compile(action.destination)(data);
            _context.prev = 35;
            _context.next = 38;
            return (0, _file.open)(templatePath, "a+");

          case 38:
            template = _context.sent;
            _context.next = 41;
            return template.readFile(UTF8);

          case 41:
            content = _context.sent;
            templateStatus[templatePath] = content.length ? FileStatus.CREATED : FileStatus.EXISTS;
            _context.next = 48;
            break;

          case 45:
            _context.prev = 45;
            _context.t2 = _context["catch"](35);
            templateStatus[templatePath] = FileStatus.EXISTS;

          case 48:
            _context.prev = 48;
            (_template = template) === null || _template === void 0 ? void 0 : _template.close();
            return _context.finish(48);

          case 51:
            if (content.trim().length) {
              _context.next = 53;
              break;
            }

            return _context.abrupt("continue", 68);

          case 53:
            _context.prev = 53;
            _context.next = 56;
            return (0, _file.open)(destinationPath, "wx+");

          case 56:
            destination = _context.sent;
            _context.next = 59;
            return destination.writeFile(_template2["default"].compile(content)(data), UTF8);

          case 59:
            destinationStatus[destinationPath] = FileStatus.CREATED;
            _context.next = 65;
            break;

          case 62:
            _context.prev = 62;
            _context.t3 = _context["catch"](53);
            destinationStatus[destinationPath] = FileStatus.EXISTS;

          case 65:
            _context.prev = 65;
            (_destination = destination) === null || _destination === void 0 ? void 0 : _destination.close();
            return _context.finish(65);

          case 68:
            _context.next = 27;
            break;

          case 70:
            _context.next = 75;
            break;

          case 72:
            _context.prev = 72;
            _context.t4 = _context["catch"](25);

            _iterator.e(_context.t4);

          case 75:
            _context.prev = 75;

            _iterator.f();

            return _context.finish(75);

          case 78:
            printTree(templateStatus, "Generated templates");
            printTree(destinationStatus, "Generated codes");

          case 80:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[25, 72, 75, 78], [35, 45, 48, 51], [53, 62, 65, 68]]);
  }));

  return function gen() {
    return _ref.apply(this, arguments);
  };
}();

exports.gen = gen;

function printTree() {
  var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var msg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
  if (!(0, _object.isObject)(obj)) return;
  if (!Object.keys(obj).length) return;
  var tree = {};

  for (var key in obj) {
    var paths = key.split(_path["default"].sep);
    var status = obj[key];
    tree = (0, _object.mergeObject)(tree, (0, _object.toObject)(paths.concat(status)));
  }

  console.log(_chalk["default"].blue(msg));
  console.log(_treeify["default"].asTree(tree, true));
}