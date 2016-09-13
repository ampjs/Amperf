'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _AmperfTemplate = require('./AmperfTemplate.js');

var _AmperfTemplate2 = _interopRequireDefault(_AmperfTemplate);

var _AmperfBenchmark = require('./AmperfBenchmark.js');

var _AmperfBenchmark2 = _interopRequireDefault(_AmperfBenchmark);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @class
 * @classdesc The testing class.
 */
var AmperfTest = function () {

    /**
     * Construct the class.
     * @param  {Object} definition The test definition.
     * @param  {Object} options={} The options, usually passed from Amperf.
     * @return {Object}            Returns self.
     */
    function AmperfTest(definition) {
        var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

        _classCallCheck(this, AmperfTest);

        this.definition = definition;
        this.options = options;
        this.test_item = {
            description: '',
            log: []
        };

        this.pass_count = 0;
        this.results = {};
        this.current = {};

        this.Template = new _AmperfTemplate2.default(this.options.template);
        this.Template.group(this.definition);

        return this;
    }

    /**
     * The test method called in the definition group.
     * @param  {String}     description     The test description.
     * @param  {Function}   test_callback   The test to be run.
     * @return {Object}                     Returns self.
     */


    _createClass(AmperfTest, [{
        key: 'test',
        value: function test(description, test_callback) {
            this.setDescription = description;

            this.Template.testItemStart(this.test_item);

            this._runTests(test_callback);

            this.Template.testItemResults(this.options.show, this.results);

            return this;
        }
    }, {
        key: '_runTests',
        value: function _runTests(test) {
            // Set some defaults before running the tests.
            var timeAverage = 0;
            var memoryAverage = 0;

            this.results = {
                time_start: new Date(),
                time_end: null,
                time_total: null,
                time_average: 0,
                count: 0,
                iterations: [],
                time_slowest: null,
                slowest_iteration: 0,
                time_fastest: null,
                fastest_iteration: 0
            };

            do {
                // Store each iteration.
                this.Template.testItemIteration(this.results.count++);
                this.current = this._runTestIteration(test);

                // Increment the time and memory used.
                timeAverage += this.current.execution_time;
                memoryAverage += this.current.memory_used;

                this._addFastestTime('fastest');
                this._addSlowestTime();

                this.results.iterations.push(this.current);
            } while (this.results.count < this.options.iterations);

            this._calculateEndTimes(timeAverage, memoryAverage);

            return test;
        }
    }, {
        key: '_runTestIteration',
        value: function _runTestIteration(test) {
            var iterationResults = {},
                startTime = process.hrtime(),
                initialMemory = process.memoryUsage().rss;

            iterationResults.output = test();

            iterationResults.memory_used = this.memoryUsed(initialMemory);
            iterationResults.execution_time = this.executionTime(startTime);

            return iterationResults;
        }
    }, {
        key: '_setTime',
        value: function _setTime() {
            var type = arguments.length <= 0 || arguments[0] === undefined ? 'fastest' : arguments[0];

            if (!this.results['time_' + type]) {
                this.results['time_' + type] = this.current.execution_time;
                this.results[type + '_iteration'] = this.results.count;
            }
        }
    }, {
        key: '_addFastestTime',
        value: function _addFastestTime() {
            this._setTime('fastest');

            if (this.results['time_fastest'] > this.current.execution_time) {
                this.results['time_fastest'] = this.current.execution_time;
                this.results['fastest_iteration'] = this.results.count;
            }
        }
    }, {
        key: '_addSlowestTime',
        value: function _addSlowestTime() {
            this._setTime('slowest');

            if (this.results['time_slowest'] < this.current.execution_time) {
                this.results['time_slowest'] = this.current.execution_time;
                this.results['slowest_iteration'] = this.results.count;
            }
        }
    }, {
        key: '_calculateEndTimes',
        value: function _calculateEndTimes(time, memory) {
            this.results.time_end = new Date();
            this.results.time_total = this.totalTime();
            this.results.time_average = this.timeAverage(time);
            this.results.memory_average = this.memoryAverage(memory);
        }
    }, {
        key: 'memoryUsed',
        value: function memoryUsed(memory) {
            return process.memoryUsage().rss - memory;
        }
    }, {
        key: 'executionTime',
        value: function executionTime(time) {
            var timed = process.hrtime(time);

            return timed[1] / 1000000;
        }
    }, {
        key: 'totalTime',
        value: function totalTime() {
            return (this.results.time_end - this.results.time_start) / 1000;
        }
    }, {
        key: 'timeAverage',
        value: function timeAverage(time) {
            return time / this.results.count;
        }
    }, {
        key: 'memoryAverage',
        value: function memoryAverage(memory) {
            return (memory / this.results.count / (1024 * 1024)).toFixed(2);
        }
    }, {
        key: 'bench',
        value: function bench() {
            var thresholds = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

            var benchmark = new _AmperfBenchmark2.default(this.results, thresholds);

            return benchmark.perform();
        }
    }, {
        key: 'log',
        value: function log(message) {
            this.test_item.log.push(message);
        }
    }, {
        key: 'setDescription',
        set: function set(description) {
            this.test_item.description = description;
        }
    }]);

    return AmperfTest;
}();

exports.default = AmperfTest;