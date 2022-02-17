"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var electron = _interopRequireWildcard(require("electron"));

var fs = _interopRequireWildcard(require("fs"));

var _path = require("path");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var TextOutputPlugin = /*#__PURE__*/function () {
  /**
   * Base Plugin Details (Eventually implemented into a GUI in settings)
   */

  /**
   * Private variables for interaction in plugins
   */

  /**
   * Runs on plugin load (Currently run on application start)
   */
  function TextOutputPlugin(app, store) {
    _classCallCheck(this, TextOutputPlugin);

    _defineProperty(this, "name", 'Text Output');

    _defineProperty(this, "description", 'A plugin to output song information to a text file.');

    _defineProperty(this, "version", '0.0.1');

    _defineProperty(this, "author", 'Chase Ingebritson');

    _defineProperty(this, "fileName", 'textOutput.txt');

    _defineProperty(this, "template", "$$t - $$a [$$l]");

    _defineProperty(this, "fields", [{
      key: 'name',
      placeholder: '$$t'
    }, {
      key: 'artistName',
      placeholder: '$$a'
    }, {
      key: 'albumName',
      placeholder: '$$l'
    }, {
      key: 'composerName',
      placeholder: '$$c'
    }]);

    _defineProperty(this, "_win", void 0);

    _defineProperty(this, "_app", void 0);

    _defineProperty(this, "_store", void 0);

    _defineProperty(this, "_pluginPath", (0, _path.resolve)(electron.app.getPath('userData'), "./plugins/text-output"));

    this._app = app;
    this._store = store;
    console.debug("[Plugin][".concat(this.name, "] Loading Complete."));
  }
  /**
   * Runs on app ready
   */


  _createClass(TextOutputPlugin, [{
    key: "onReady",
    value: function () {
      var _onReady = _asyncToGenerator(function* (win) {
        this._win = win;
        yield this.assureOutputFileExists();
        console.debug("[Plugin][".concat(this.name, "] Ready."));
      });

      function onReady(_x) {
        return _onReady.apply(this, arguments);
      }

      return onReady;
    }()
    /**
     * Runs on app stop
     */

  }, {
    key: "onBeforeQuit",
    value: function onBeforeQuit() {
      console.log("[Plugin][".concat(this.name, "] Stopped"));
    }
    /**
     * Runs on playback State Change
     * @param attributes Music Attributes (attributes.status = current state)
     */

  }, {
    key: "onPlaybackStateDidChange",
    value: function onPlaybackStateDidChange(attributes) {
      var updatedTemplate = this.populateTemplate(attributes);
      this.updateOutputFile(updatedTemplate);
    }
    /**
     * Runs on song change
     * @param attributes Music Attributes
     */

  }, {
    key: "onNowPlayingItemDidChange",
    value: function onNowPlayingItemDidChange(attributes) {
      var updatedTemplate = this.populateTemplate(attributes);
      this.updateOutputFile(updatedTemplate);
    }
    /**
     * Create the output file, or just open it if it already exists
     * @private
     */

  }, {
    key: "assureOutputFileExists",
    value: function () {
      var _assureOutputFileExists = _asyncToGenerator(function* () {
        try {
          yield fs.promises.mkdir(this._pluginPath, {
            recursive: true
          });
          yield fs.promises.open("".concat(this._pluginPath, "/").concat(this.fileName), 'w');
        } catch (err) {
          console.error("[Plugin][".concat(this.name, "]"), err);
        }
      });

      function assureOutputFileExists() {
        return _assureOutputFileExists.apply(this, arguments);
      }

      return assureOutputFileExists;
    }()
    /**
     * Populate the template with the song and artist
     * @private
     */

  }, {
    key: "populateTemplate",
    value: function populateTemplate(attributes) {
      var output = this.template;
      this.fields.forEach(function (field) {
        if (attributes[field.key]) {
          output = output.replaceAll(field.placeholder, attributes[field.key]);
        }
      });
      return output;
    }
    /**
     * Create and update the file
     * @param input The contents to write to the file
     * @private
     */

  }, {
    key: "updateOutputFile",
    value: function () {
      var _updateOutputFile = _asyncToGenerator(function* (input) {
        var _this = this;

        yield fs.promises.writeFile("".concat(this._pluginPath, "/").concat(this.fileName), input)["catch"](function (err) {
          return console.error("[Plugin][".concat(_this.name, "]"), err);
        });
      });

      function updateOutputFile(_x2) {
        return _updateOutputFile.apply(this, arguments);
      }

      return updateOutputFile;
    }()
  }]);

  return TextOutputPlugin;
}();

exports["default"] = TextOutputPlugin;
