import AmperfTest from './AmperfTest.js'
import Outputs from '@ampersarnie/outputs';

/**
 * Initial booting of Amperf
 * @class
 * @classdesc The initial Amperf class.
 */
class Amperf {

    /**
     * Construct the class
     * @param  {Array}  options    Given options.
     * @return {void}
     */
    constructor(options) {
        this.default_options =  {
            iterations: 100,
            show: ['cycle_time', 'time_average', 'memory_average', 'time_fastest', 'time_slowest'],
            dev_mode: false
            // run: [],
            // save: false,
            // save_file: 'amperf-result.json'
        };

        this.tests = [];
        this.options = Object.assign(this.default_options, options);

        /**
         * Write some initial information to the STDOUT.
         */
        Outputs.message('\x1b[1mStarting Amperf tests.\x1b[0m\n');
        Outputs.message('\tIterations: \x1b[32m' + this.options.iterations + '\x1b[0m\n');
        Outputs.message('\tTesting: \x1b[32m' + this.options.show.join(', ') + '\x1b[0m\n');
        Outputs.nl();
    }

    /**
     * Creates a group of tests to be run.
     *
     * @param {String}      description The group description.
     * @param {Function}    callback    The group of tests.
     * @return {Object}                 Returns self.
     */
    describe(description, callback) {
        let definition = {
            description: description,
            callback: callback,
            pass_count: 0,
            results: {}
        };

        let test = new AmperfTest(definition, this.options);
        let results = callback(test.test.bind(test));

        /**
         * Add the current test setup to the tests object.
         */
        this.tests.push(test);

        return this;
    }
}

export default Amperf;
