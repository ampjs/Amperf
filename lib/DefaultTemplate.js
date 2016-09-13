'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _outputs = require('@ampersarnie/outputs');

var _outputs2 = _interopRequireDefault(_outputs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DefaultTemplate = function () {
    function DefaultTemplate() {
        _classCallCheck(this, DefaultTemplate);
    }

    _createClass(DefaultTemplate, [{
        key: 'group',
        value: function group(definition) {
            _outputs2.default.message('\x1b[4m' + definition.description + '\x1b[0m\n');
        }
    }, {
        key: 'testItemStart',
        value: function testItemStart(test_item) {
            // Write the test description and id to the STDOUT.
            _outputs2.default.message('\t\x1b[1mTesting: \x1b[4m' + test_item.description + '\x1b[0m\n');
            _outputs2.default.message('\tProcessing...');
        }
    }, {
        key: 'testItemIteration',
        value: function testItemIteration(i) {
            _outputs2.default.clearLine();
            _outputs2.default.message('\tProcessing... ' + i);
        }
    }, {
        key: 'testItemResults',
        value: function testItemResults(show, results) {
            _outputs2.default.clearLine();

            for (var i in show) {
                switch (show[i]) {
                    case 'cycle_time':
                        _outputs2.default.message('\t◦ Cycled \u001b[36m' + results.count + '\x1b[0m iterations over \x1b[36m' + results.time_total + 'sec\x1b[0m\n');
                        break;
                    case 'time_average':
                        _outputs2.default.message('\t◦ Average time: \u001b[36m' + results.time_average + 'ms\x1b[0m\n');
                        break;
                    case 'memory_average':
                        _outputs2.default.message('\t◦ Average memory used: \u001b[36m' + results.memory_average + 'MB\x1b[0m\n');
                        break;
                    case 'time_slowest':
                        _outputs2.default.message('\t◦ Slowest: \u001b[36m' + results.time_slowest + 'ms\x1b[0m at \x1b[36m' + results.slowest_iteration + '\x1b[0m\n');
                        break;
                    case 'time_fastest':
                        _outputs2.default.message('\t◦ Fastest: \u001b[36m' + results.time_fastest + 'ms\x1b[0m at \x1b[36m' + results.fastest_iteration + '\x1b[0m\n');
                        break;
                }
            }

            _outputs2.default.nl();
        }
    }], [{
        key: 'benchmarkStart',
        value: function benchmarkStart() {
            _outputs2.default.message('\t\x1b[1mBenchmarking\x1b[0m\n');
        }
    }, {
        key: 'benchmarkItem',
        value: function benchmarkItem(i, result, threshold) {
            var pointer = '←'; // less than
            var colour = '\x1b[32m'; // green

            if (result > threshold) {
                pointer = '→'; // greater than
                colour = '\x1b[31m'; // red
            } else if (result == threshold) {
                pointer = '⇆'; // equals
                colour = '\x1b[33m'; // yellow
            }

            _outputs2.default.message(colour + '\t\t• \u001b[0m ' + i + ': ' + colour + result + ' ' + pointer + ' ' + threshold + '\x1b[0m\n');
        }
    }, {
        key: 'benchmarkPasses',
        value: function benchmarkPasses(passed, count) {
            var colour = '\x1b[32m'; // green

            if (passed < count) {
                colour = '\x1b[31m'; // red
            }

            _outputs2.default.message('\t\x1b[1mBenchmarking Passes\x1b[0m ' + colour + passed + '/' + count + '\x1b[0m\n');
            _outputs2.default.nl();
        }
    }]);

    return DefaultTemplate;
}();

exports.default = DefaultTemplate;