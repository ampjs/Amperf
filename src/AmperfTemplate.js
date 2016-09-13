import { Implements, Interface } from '@ampersarnie/implements';
import TemplateInterface from './TemplateInterface.js';
import path from 'path';

/**
 * @class
 * @classdesc Loads the template for the Amperf
 * output.
 */
class AmperfTemplate {
    /**
     * Construct the class.
     * @param  {String} file The path of the file to use.
     * @return {class}      Returns the instantiated template class.
     */
    constructor(file) {
        this.template_file = file;
        let target = path.resolve(process.cwd(), this.template_file);
        let template = require(target).default;
        let interfaced = Interface.apply(template, [TemplateInterface]);

        return new interfaced.implements;

        // return new template();
        // return new Interface(template);
    }
}

export default AmperfTemplate;
