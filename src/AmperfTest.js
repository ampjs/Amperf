import AmperfTemplate from './AmperfTemplate.js';
import AmperfBenchmark from './AmperfBenchmark.js';

/**
 * @class
 * @classdesc The testing class.
 */
class AmperfTest {

    /**
     * Construct the class.
     * @param  {Object} definition The test definition.
     * @param  {Object} options={} The options, usually passed from Amperf.
     * @return {Object}            Returns self.
     */
    constructor(definition, options = {}) {
        this.definition = definition;
        this.options = options;
        this.test_item = {
            description: '',
            log: []
        };

        this.pass_count = 0;
        this.results = {};
        this.current = {};

        this._console = console;
        this.consoleOutput = [];

        this.Template = new AmperfTemplate(this.options.template);
        this.Template.group(this.definition);

        return this;
    }

    /**
     * The test method called in the definition group.
     * @param  {String}     description     The test description.
     * @param  {Function}   test_callback   The test to be run.
     * @return {Object}                     Returns self.
     */
    test(description, test_callback) {
        this.setDescription = description;

        this.Template.testItemStart(this.test_item);

        this._runTests(test_callback);

        this.Template.testItemResults(this.options.show, this.results);

        return this;
    }

    _runTests(test) {
        // Set some defaults before running the tests.
        let timeAverage = 0;
        let memoryAverage = 0;

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
            this._consoleReplace();

            // Store each iteration.
            this.Template.testItemIteration(this.results.count++);
            this.current = this._runTestIteration(test);

            this._consoleReinstate();

            // Increment the time and memory used.
            timeAverage += this.current.execution_time;
            memoryAverage += this.current.memory_used;

            this._addFastestTime('fastest');
            this._addSlowestTime();

            this.results.iterations.push(this.current);
        } while(this.results.count < this.options.iterations);

        this._calculateEndTimes(timeAverage, memoryAverage);

        return test;

    }

    _runTestIteration(test) {
        let iterationResults = {
                output: {
                    type: 'Test',
                    console: [],
                    returned: null
                }
            },
            startTime = process.hrtime(),
            initialMemory = process.memoryUsage().rss;

        try {
            iterationResults.output.returned = test();
            iterationResults.output.console = this.consoleOutput;
        } catch(error) {
            iterationResults.output = {
                type: 'Exception',
                returned: error,
            }
        }

        iterationResults.memory_used = this.memoryUsed(initialMemory);
        iterationResults.execution_time = this.executionTime(startTime);

        return iterationResults;
    }

    _consoleReplace() {
        for(let method in console) {
            if(method !== 'log') console[method] = this._consoleCatch.bind(this);
        }
    }

    _consoleCatch() {
        this.consoleOutput.push(arguments);
    }

    _consoleReinstate() {
        for(let method in this.console) {
            console[method] = this._console[method];
        }
    }

    _setTime(type = 'fastest') {
        if(!this.results['time_' + type]) {
            this.results['time_' + type] = this.current.execution_time;
            this.results[type + '_iteration'] = this.results.count;
        }
    }

    _addFastestTime() {
        this._setTime('fastest');

        if(this.results['time_fastest'] > this.current.execution_time) {
            this.results['time_fastest'] = this.current.execution_time;
            this.results['fastest_iteration'] = this.results.count;
        }
    }

    _addSlowestTime() {
        this._setTime('slowest');

        if(this.results['time_slowest'] < this.current.execution_time) {
            this.results['time_slowest'] = this.current.execution_time;
            this.results['slowest_iteration'] = this.results.count;
        }
    }

    _calculateEndTimes(time, memory) {
        this.results.time_end = new Date();
        this.results.time_total = this.totalTime();
        this.results.time_average = this.timeAverage(time);
        this.results.memory_average = this.memoryAverage(memory);
    }

    memoryUsed(memory) {
        return (process.memoryUsage().rss - memory);
    }

    executionTime(time) {
        let timed = process.hrtime(time);

        return timed[1]/1000000
    }

    totalTime() {
        return ((this.results.time_end - this.results.time_start) / 1000);
    }

    timeAverage(time) {
        return (time / this.results.count);
    }

    memoryAverage(memory) {
        return ((memory / this.results.count) / (1024*1024)).toFixed(2);
    }

    bench(thresholds = {}) {
        let benchmark = new AmperfBenchmark(this.results, thresholds);

        return benchmark.perform();
    }

    set setDescription(description) {
        this.test_item.description = description;
    }

    log(message) {
        this.test_item.log.push(message);
    }
}

export default AmperfTest;
