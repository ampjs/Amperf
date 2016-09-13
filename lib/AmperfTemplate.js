'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _implements = require('@ampersarnie/implements');

var _TemplateInterface = require('./TemplateInterface.js');

var _TemplateInterface2 = _interopRequireDefault(_TemplateInterface);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @class
 * @classdesc Loads the template for the Amperf
 * output.
 */
var AmperfTemplate =
/**
 * Construct the class.
 * @param  {String} file The path of the file to use.
 * @return {class}      Returns the instantiated template class.
 */
function AmperfTemplate(file) {
  _classCallCheck(this, AmperfTemplate);

  this.template_file = file;
  var target = _path2.default.resolve(process.cwd(), this.template_file);
  var template = require(target).default;
  var interfaced = _implements.Interface.apply(template, [_TemplateInterface2.default]);

  return new interfaced.implements();

  // return new template();
  // return new Interface(template);
};

exports.default = AmperfTemplate;