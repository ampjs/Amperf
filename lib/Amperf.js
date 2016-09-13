'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _AmperfTest = require('./AmperfTest.js');

var _AmperfTest2 = _interopRequireDefault(_AmperfTest);

var _outputs = require('@ampersarnie/outputs');

var _outputs2 = _interopRequireDefault(_outputs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Initial booting of Amperf
 * @class
 * @classdesc The initial Amperf class.
 */
var Amperf = function () {

  /**
   * Construct the class
   * @param  {Array}  options    Given options.
   * @return {void}
   */
  function Amperf(options) {
    _classCallCheck(this, Amperf);

    this.default_options = {
      iterations: 100,
      show: ['cycle_time', 'time_average', 'memory_average', 'time_fastest', 'time_slowest']
    };

    this.tests = [];
    this.options = Object.assign(this.default_options, options);

    /**
     * Write some initial information to the STDOUT.
     */
    _outputs2.default.message('\x1b[1mStarting Amperf tests.\x1b[0m\n');
    _outputs2.default.message('\tIterations: \x1b[32m' + this.options.iterations + '\x1b[0m\n');
    _outputs2.default.message('\tTesting: \x1b[32m' + this.options.show.join(', ') + '\x1b[0m\n');
    _outputs2.default.nl();
  }

  /**
   * Creates a group of tests to be run.
   *
   * @param {String}      description The group description.
   * @param {Function}    callback    The group of tests.
   * @return {Object}                 Returns self.
   */


  _createClass(Amperf, [{
    key: 'describe',
    value: function describe(description, callback) {
      var definition = {
        description: description,
        callback: callback,
        pass_count: 0,
        results: {}
      };

      var test = new _AmperfTest2.default(definition, this.options);
      var results = callback(test.test.bind(test));

      /**
       * Add the current test setup to the tests object.
       */
      this.tests.push(results);

      return this;
    }
  }]);

  return Amperf;
}();

exports.default = Amperf;