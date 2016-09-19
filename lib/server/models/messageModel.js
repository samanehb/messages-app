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

var uuid = require('node-uuid');


var DOC_TYPE = 'message';

var MessageModel = function (_ObjectModel) {
    _inherits(MessageModel, _ObjectModel);

    /**
     * Create a MessageModel
     * Required param is : content
     * If this message object is just to be created, no need to include id (a UUID will be generated), 
     *  and _id and _rev can be set when persisted to db
     */
    function MessageModel(content, messageId, _id, _rev) {
        _classCallCheck(this, MessageModel);

        var _this = _possibleConstructorReturn(this, (MessageModel.__proto__ || Object.getPrototypeOf(MessageModel)).call(this, DOC_TYPE));

        _this._messageContent = content;
        _this._messageId = messageId;
        _this._id = _id;
        _this._rev = _rev;
        return _this;
    }

    /**
     * See super.copy for documentation
     */


    _createClass(MessageModel, [{
        key: 'getApiModel',


        /**
         * See super.getApiModel for documentation
         */
        value: function getApiModel(version) {
            if (version.toLowerCase() === 'v1') {
                return {
                    messageContent: this._messageContent,
                    messageId: this.messageId
                };
            } else {
                // else handle future versions here
                return {}; // return default, this is an invalid state, just avoiding undefined
            }
        }

        /**
         * See super.getPersistedModel for documentation
         * Note: No property can start with _ , except cloudant's special ones -> cloudant restriction 
         */

    }, {
        key: 'getPersistedModel',
        value: function getPersistedModel() {
            return {
                messageContent: this._messageContent,
                messageId: this.messageId, // make sure UUID is set if not already
                _id: this._id,
                _rev: this._rev,
                docType: this._docType // always also add docType, good for indexing, views, etc
            };
        }
    }, {
        key: 'messageId',
        get: function get() {
            if (this._messageId) {
                return this._messageId;
            }
            // create UUID
            this._messageId = uuid.v1();
            return this._messageId;
        }
    }, {
        key: 'isPalindrome',
        get: function get() {
            // Cache the result of calculation for this object in case retrieved more than once
            // If this is a highly requested property, we can think of persisting in database as part of the data, since it only changes when data/message changes
            if (this._isPalindrome !== undefined) {
                return this._isPalindrome;
            }
            // TODO
            this._isPalindrome = true;
            return this._isPalindrome;
        }
    }], [{
        key: 'copy',
        value: function copy(obj) {
            return new MessageModel(obj.messageContent, obj.messageId, obj._id, obj._rev);

            // or try this TODO 
            //obj.prototype = MessageModel;
        }
    }]);

    return MessageModel;
}(_objectModel2.default);

exports.default = MessageModel;