"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createConfig = createConfig;
exports.gen = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _chalk = _interopRequireDefault(require("chalk"));

var _treeify = _interopRequireDefault(require("treeify"));

var _inquirer = _interopRequireDefault(require("inquirer"));

var _path = _interopRequireDefault(require("path"));

var _template = _interopRequireDefault(require("./template.js"));

var _file = require("./file");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var UTF8 = {
  encoding: "utf8"
};
var FileStatus = {
  SKIP: "skip",
  CREATED: "created",
  EXISTS: "exists"
};

var gen = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(options, type, name) {
    var _options$config, configPath, dryRun, config, version, actions, action, prompts, templates, environment, answers, envvars, status, _iterator, _step, template, initialData, variables, data, source, destination, content, _handlebars$compile$s, _handlebars$compile$s2, sourcePath, destinationPath, _source, _destination;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _options$config = options.config, configPath = _options$config === void 0 ? "config.json" : _options$config, dryRun = options.dryRun;
            config = (0, _file.load)(configPath); // Allow extending of handlebars if a config.js file is loaded.

            _context.t0 = (0, _file.ext)(configPath);
            _context.next = _context.t0 === ".js" ? 5 : 8;
            break;

          case 5:
            if (config.handlebars && typeof config.handlebars === "function") {
              config.handlebars(_template["default"]);
            }

            delete config.handlebars;
            return _context.abrupt("break", 8);

          case 8:
            version = config.version, actions = config.actions;
            action = actions.find(function (action) {
              return action.name === type;
            });

            if (action) {
              _context.next = 12;
              break;
            }

            throw new Error("Action \"".concat(type, " is not specified in the ").concat(configPath, "\""));

          case 12:
            prompts = action.prompts, templates = action.templates, environment = action.environment;

            if (!prompts) {
              _context.next = 19;
              break;
            }

            _context.next = 16;
            return _inquirer["default"].prompt(prompts);

          case 16:
            _context.t1 = _context.sent;
            _context.next = 20;
            break;

          case 19:
            _context.t1 = {};

          case 20:
            answers = _context.t1;
            envvars = parseEnvironment(environment);
            status = {};
            _iterator = _createForOfIteratorHelper(templates);
            _context.prev = 24;

            _iterator.s();

          case 26:
            if ((_step = _iterator.n()).done) {
              _context.next = 79;
              break;
            }

            template = _step.value;
            initialData = _objectSpread(_objectSpread({
              name: name,
              type: type
            }, answers), envvars);
            variables = parseVariables(_template["default"], initialData, template.variables);
            data = _objectSpread(_objectSpread({}, initialData), variables);
            source = void 0;
            destination = void 0;
            content = ""; // Read from template and write to destination.

            _handlebars$compile$s = _template["default"].compile(template.path)(data).split(_path["default"].delimiter), _handlebars$compile$s2 = (0, _slicedToArray2["default"])(_handlebars$compile$s, 2), sourcePath = _handlebars$compile$s2[0], destinationPath = _handlebars$compile$s2[1];
            _context.prev = 35;
            _context.next = 38;
            return (0, _file.open)(sourcePath, "a+");

          case 38:
            source = _context.sent;
            _context.next = 41;
            return source.readFile(UTF8);

          case 41:
            content = _context.sent;
            _context.next = 47;
            break;

          case 44:
            _context.prev = 44;
            _context.t2 = _context["catch"](35);
            status[sourcePath] = _context.t2.message;

          case 47:
            _context.prev = 47;
            (_source = source) === null || _source === void 0 ? void 0 : _source.close();
            return _context.finish(47);

          case 50:
            if (content.trim().length) {
              _context.next = 53;
              break;
            }

            status[destinationPath] = "template is empty: ".concat(sourcePath);
            return _context.abrupt("continue", 77);

          case 53:
            if (!dryRun) {
              _context.next = 60;
              break;
            }

            console.log(_chalk["default"].blue("Printing ".concat(templatePath, ":")));
            console.log();
            console.log(_template["default"].compile(content)(data));
            console.log();
            _context.next = 77;
            break;

          case 60:
            _context.prev = 60;
            _context.next = 63;
            return (0, _file.createFolder)((0, _file.folderName)(destinationPath));

          case 63:
            _context.next = 65;
            return (0, _file.open)(destinationPath, "wx+");

          case 65:
            destination = _context.sent;
            _context.next = 68;
            return destination.writeFile(_template["default"].compile(content)(data), UTF8);

          case 68:
            status[destinationPath] = FileStatus.CREATED;
            _context.next = 74;
            break;

          case 71:
            _context.prev = 71;
            _context.t3 = _context["catch"](60);
            status[destinationPath] = _context.t3.code === "EEXIST" ? "file exists" : _context.t3.message;

          case 74:
            _context.prev = 74;
            (_destination = destination) === null || _destination === void 0 ? void 0 : _destination.close();
            return _context.finish(74);

          case 77:
            _context.next = 26;
            break;

          case 79:
            _context.next = 84;
            break;

          case 81:
            _context.prev = 81;
            _context.t4 = _context["catch"](24);

            _iterator.e(_context.t4);

          case 84:
            _context.prev = 84;

            _iterator.f();

            return _context.finish(84);

          case 87:
            console.table(status);

          case 88:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[24, 81, 84, 87], [35, 44, 47, 50], [60, 71, 74, 77]]);
  }));

  return function gen(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

exports.gen = gen;

function createConfig() {
  return _createConfig.apply(this, arguments);
}

function _createConfig() {
  _createConfig = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
    var config, file;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            config = require("../config.sample.json5"); // Opens the file for read/write, but throws error when exists.

            _context2.next = 3;
            return (0, _file.open)("config.json", "wx+");

          case 3:
            file = _context2.sent;
            _context2.next = 6;
            return file.writeFile(JSON.stringify(config, null, 2), UTF8);

          case 6:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _createConfig.apply(this, arguments);
}

function parseEnvironment() {
  var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var entries = Object.entries(obj).map(function (_ref2) {
    var _ref3 = (0, _slicedToArray2["default"])(_ref2, 2),
        key = _ref3[0],
        value = _ref3[1];

    var environmentValue = process.env[value];

    if (!environmentValue) {
      throw new Error("Env \"".concat(value, "\" is defined, but no value is provided"));
    }

    return [key, environmentValue];
  });
  return Object.fromEntries(entries);
} // parseVariables parses the custom template variables that are action
// specific.


function parseVariables(handlebars, data) {
  var obj = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var entries = Object.entries(obj).map(function (_ref4) {
    var _ref5 = (0, _slicedToArray2["default"])(_ref4, 2),
        key = _ref5[0],
        value = _ref5[1];

    var parsed = handlebars.compile(value)(data);
    return [key, parsed];
  });
  return Object.fromEntries(entries);
}