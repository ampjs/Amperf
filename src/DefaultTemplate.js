import Outputs from '@ampersarnie/outputs';

class DefaultTemplate {
    group(definition) {
        Outputs.message('\x1b[4m' + definition.description + '\x1b[0m\n');
    }

    testItemStart(test_item) {
        // Write the test description and id to the STDOUT.
        Outputs.message('\t\x1b[1mTesting: \x1b[4m' + test_item.description + '\x1b[0m\n');
        Outputs.message('\tProcessing...');
    }

    testItemIteration(i) {
        Outputs.clearLine();
        Outputs.message('\tProcessing... ' + i);
    }

    testItemResults(show, results) {
        Outputs.clearLine();

        for(let i in show) {
            switch(show[i]) {
                case 'cycle_time':
                    Outputs.message('\t\u25E6 Cycled \x1b[36m' + results.count + '\x1b[0m iterations over \x1b[36m' + results.time_total + 'sec\x1b[0m\n');
                    break;
                case 'time_average':
                    Outputs.message('\t\u25E6 Average time: \x1b[36m' + results.time_average + 'ms\x1b[0m\n');
                    break;
                case 'memory_average':
                    Outputs.message('\t\u25E6 Average memory used: \x1b[36m' + results.memory_average + 'MB\x1b[0m\n');
                    break;
                case 'time_slowest':
                    Outputs.message('\t\u25E6 Slowest: \x1b[36m' + results.time_slowest + 'ms\x1b[0m at \x1b[36m' + results.slowest_iteration + '\x1b[0m\n');
                    break;
                case 'time_fastest':
                    Outputs.message('\t\u25E6 Fastest: \x1b[36m' + results.time_fastest + 'ms\x1b[0m at \x1b[36m' + results.fastest_iteration + '\x1b[0m\n');
                    break;
            }
        }

        Outputs.nl();
    }

    static benchmarkStart() {
        Outputs.message('\t\x1b[1mBenchmarking\x1b[0m\n');
    }

    static benchmarkItem(i, result, threshold) {
        let pointer = '\u2190'; // less than
        let colour = '\x1b[32m'; // green

        if(result > threshold) {
            pointer = '\u2192'; // greater than
            colour = '\x1b[31m'; // red
        } else if(result == threshold) {
            pointer = '\u21C6'; // equals
            colour = '\x1b[33m'; // yellow
        }

        Outputs.message(colour + '\t\t\u2022 \x1b[0m ' + i + ': ' + colour + result + ' ' + pointer + ' ' + threshold + '\x1b[0m\n');
    }

    static benchmarkPasses(passed, count) {
        let colour = '\x1b[32m'; // green

        if(passed < count) {
            colour = '\x1b[31m'; // red
        }

        Outputs.message('\t\x1b[1mBenchmarking Passes\x1b[0m ' + colour + passed + '/' + count + '\x1b[0m\n');
        Outputs.nl();
    }
}

export default DefaultTemplate;
