'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Amperf2 = require('./Amperf.js');

var _Amperf3 = _interopRequireDefault(_Amperf2);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _outputs = require('@ampersarnie/outputs');

var _outputs2 = _interopRequireDefault(_outputs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * @class
 * @classdesc The node specific Amperf booter.
 */
var AmperfNode = function (_Amperf) {
    _inherits(AmperfNode, _Amperf);

    /**
     * Construct the class
     * @return {void}
     */
    function AmperfNode() {
        _classCallCheck(this, AmperfNode);

        var _this = _possibleConstructorReturn(this, (AmperfNode.__proto__ || Object.getPrototypeOf(AmperfNode)).call(this, {
            template: __dirname + '/DefaultTemplate.js'
        }));

        if (typeof process !== 'undefined') {
            _this._setNodeArguments();

            /**
             * @todo check if file exists. path.existsSync(this.options.file);
             */
            global.Amperf = _this;
            _this.loadTests();
        } else {
            console.warn('AmperfNode can only run in a node environment, please use Amperf for the browser.');
        }
        return _this;
    }

    _createClass(AmperfNode, [{
        key: 'loadTests',
        value: function loadTests() {
            var _this2 = this;

            var target = _path2.default.resolve(process.cwd(), this.options.file);

            _fs2.default.lstat(target, function (error, stat) {
                if (error !== null && error.code === 'ENOENT') {
                    _outputs2.default.message('\x1b[31m' + error.message + '\x1b[0m\n');
                    process.exit(1);
                }

                if (stat.isDirectory()) {
                    _this2.loadDirectory(target);
                }

                if (stat.isFile()) {
                    _this2.loadFile(target);
                }
            });
        }
    }, {
        key: 'loadDirectory',
        value: function loadDirectory(directory) {
            var _this3 = this;

            _fs2.default.readdir(directory, function (error, files) {
                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                    for (var _iterator = files[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var file = _step.value;

                        _this3.loadFile(directory + '/' + file);
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return) {
                            _iterator.return();
                        }
                    } finally {
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }
            });
        }
    }, {
        key: 'loadFile',
        value: function loadFile(file) {
            _outputs2.default.message('\x1b[1mRunning Test: \x1b[0m' + file + '\n');
            require(file);
        }

        /**
         * Get and set the arguments gathered from
         * Nodes process.argv allowing options to be
         * set from the CLI.
         * @return  {void}
         */

    }, {
        key: '_setNodeArguments',
        value: function _setNodeArguments() {
            var _this4 = this;

            // Get the arguments of the node command.
            var args = process.argv.slice(2);

            /**
             * Loop through each argument and store the
             * parameters in the options object.
             */
            args.forEach(function (value, index, array) {
                var items = value.split('=');

                switch (items[0]) {
                    // Load a sepecified file.
                    case '--file':
                    case '-f':
                        _this4.options.file = array[index + 1];
                        break;
                    case '--template':
                    case '--t':
                        _this4.options.template = array[index + 1];
                        break;
                    // How many iterations.
                    case '--iterations':
                    case '--i':
                        _this4.options.iterations = array[index + 1];
                        break;
                    case '--show':
                        _this4.options.show = array[index + 1].split(',');
                        break;
                    /**
                     * @todo Add option to run a specific test - not file.
                     *
                     * case '--run':
                     * case '--r':
                     *      this.options.run = array[index+1].split(',');
                     *      break;
                     */

                    /**
                     * @todo Add option to save test data.
                     * case '--save':
                     * case '--s':
                     *      this.options.save = true;
                     *      break;
                     * case '--save-file':
                     *      this.options.save_file = array[index+1];
                     *      break;
                     */
                }
            });
        }
    }]);

    return AmperfNode;
}(_Amperf3.default);

exports.default = AmperfNode;