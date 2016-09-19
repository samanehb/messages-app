'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _objectModel = require('./objectModel');

var _objectModel2 = _interopRequireDefault(_objectModel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ErrorModel = function (_ObjectModel) {
    _inherits(ErrorModel, _ObjectModel);

    /**
     * Create an error model
     * params:
     * code: error code for looking up the problem in docs or to contact support
     * message: summary of problem, and what to do to fix
     * description: more details
     * errors: for additional info, such as an array of errors when input validation happens, in each element mentioning which field failed to validate and why
     */
    function ErrorModel(code, message, description /*, errors*/) {
        _classCallCheck(this, ErrorModel);

        var _this = _possibleConstructorReturn(this, (ErrorModel.__proto__ || Object.getPrototypeOf(ErrorModel)).call(this));

        _this.code = code;
        _this.message = message;
        _this.description = description;
        /*this.errors = errors;*/ // if I reach to the point to do input validation
        return _this;
    }

    /** TODO if needed
    addError(error) {
        if(!this.errors) {
            this.errors = [];
        }
        this.errors.push(error);
    }
     */

    /**
     * See super.getApiModel for documentation
     */


    _createClass(ErrorModel, [{
        key: 'getApiModel',
        value: function getApiModel(version) {
            // using JSON naming convention for field names (camel case)
            if (version.toLowerCase() === 'v1') {
                return {
                    code: this.code,
                    message: this.message,
                    description: this.description
                };
            } else {
                // else handle future versions here
                return {}; // return default, this is an invalid state, just avoiding undefined
            }
        }
    }]);

    return ErrorModel;
}(_objectModel2.default);

exports.default = ErrorModel;