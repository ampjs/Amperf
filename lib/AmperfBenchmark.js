'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _outputs = require('@ampersarnie/outputs');

var _outputs2 = _interopRequireDefault(_outputs);

var _DefaultTemplate = require('./DefaultTemplate.js');

var _DefaultTemplate2 = _interopRequireDefault(_DefaultTemplate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Amperf benchmarking class.
 * @class
 * @classdesc Amperf benchmarking class.
 */
var AmperfBenchmark = function () {

    /**
     * Construct the class
     * @param  {Object} results    Test results
     * @param  {Object} thresholds Object of thresholds to meet
     * @return {void}
     */
    function AmperfBenchmark(results, thresholds) {
        _classCallCheck(this, AmperfBenchmark);

        this.results = results;
        this.thresholds = thresholds;
        this.pass_count = 0;
    }

    /**
     * Peforms the benchmark.
     * @return {void}
     */


    _createClass(AmperfBenchmark, [{
        key: 'perform',
        value: function perform() {
            if (typeof this.thresholds === 'function') {
                return thresholds(this.results);
            }

            _DefaultTemplate2.default.benchmarkStart();

            for (var i in this.thresholds) {
                if (this.results[i] <= this.thresholds[i]) {
                    this.pass_count++;
                }

                _DefaultTemplate2.default.benchmarkItem(i, this.results[i], this.thresholds[i]);
            }

            _DefaultTemplate2.default.benchmarkPasses(this.pass_count, Object.keys(this.thresholds).length);
        }
    }]);

    return AmperfBenchmark;
}();

exports.default = AmperfBenchmark;