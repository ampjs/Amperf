import Amperf from './Amperf.js';
import path from 'path';
import fs from 'fs';
import Outputs from '@ampersarnie/outputs';

/**
 * @class
 * @classdesc The node specific Amperf booter.
 */
class AmperfNode extends Amperf {

    /**
     * Construct the class
     * @return {void}
     */
    constructor() {
        super({
            template: __dirname + '/DefaultTemplate.js'
        });

        if(typeof process !== 'undefined') {
            this._setNodeArguments();

            /**
             * @todo check if file exists. path.existsSync(this.options.file);
             */
            global.Amperf = this;
            this.loadTests();
        } else {
            console.warn('AmperfNode can only run in a node environment, please use Amperf for the browser.');
        }
    }

    loadTests() {
        let target = path.resolve(process.cwd(), this.options.file);

        fs.lstat(target, (error, stat) => {
            if(error !== null && error.code === 'ENOENT') {
                Outputs.message('\x1b[31m' + error.message + '\x1b[0m\n');
                process.exit(1);
            }

            if(stat.isDirectory()) {
                this.loadDirectory(target);
            }

            if(stat.isFile()) {
                this.loadFile(target);
            }
        });
    }

    loadDirectory(directory) {
        fs.readdir(directory, (error, files) => {
            for(let file of files) {
                this.loadFile(directory + '/' + file);
            }
        });
    }

    loadFile(file) {
        Outputs.message('\x1b[1mRunning Test: \x1b[0m' + file + '\n');
        require(file);
    }

    /**
     * Get and set the arguments gathered from
     * Nodes process.argv allowing options to be
     * set from the CLI.
     * @return  {void}
     */
    _setNodeArguments() {
        // Get the arguments of the node command.
        let args = process.argv.slice(2);

        /**
         * Loop through each argument and store the
         * parameters in the options object.
         */
        args.forEach((value, index, array) => {
            let items = value.split('=');

            switch(items[0]) {
                // Load a sepecified file.
                case '--file':
                case '-f':
                    this.options.file = array[index+1];
                    break;
                case '--template':
                case '--t':
                    this.options.template = array[index+1];
                    break;
                // How many iterations.
                case '--iterations':
                case '--i':
                    this.options.iterations = array[index+1];
                    break;
                case '--show':
                    this.options.show = array[index+1].split(',');
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
}

export default AmperfNode;
