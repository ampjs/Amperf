import Outputs from 'outputs';
import DefaultTemplate from './DefaultTemplate.js';

/**
 * Amperf benchmarking class.
 * @class
 * @classdesc Amperf benchmarking class.
 */
class AmperfBenchmark {

    /**
     * Construct the class
     * @param  {Object} results    Test results
     * @param  {Object} thresholds Object of thresholds to meet
     * @return {void}
     */
    constructor(results, thresholds) {
        this.results    = results;
        this.thresholds = thresholds;
        this.pass_count = 0;
    }

    /**
     * Peforms the benchmark.
     * @return {void}
     */
    perform() {
        if(typeof this.thresholds === 'function') {
            return thresholds(this.results);
        }

        DefaultTemplate.benchmarkStart();

        for(let i in this.thresholds) {
            if(this.results[i] <= this.thresholds[i]) {
                this.pass_count++;
            }

            DefaultTemplate.benchmarkItem(i, this.results[i], this.thresholds[i]);
        }

        DefaultTemplate.benchmarkPasses(this.pass_count, Object.keys(this.thresholds).length);
    }
}

export default AmperfBenchmark;
