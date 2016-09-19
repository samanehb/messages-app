'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = createMessage;

var _responseProcessing = require('../../helpers/responseProcessing');

var _cloudantClient = require('../../database/cloudantClient');

var _messageModel = require('../../models/messageModel');

var _messageModel2 = _interopRequireDefault(_messageModel);

var _errorModel = require('../../models/errorModel');

var _errorModel2 = _interopRequireDefault(_errorModel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createMessage(req, res) {
    //return new Promise((resolve, reject) => {
    // convert response body to api model object
    var message = _messageModel2.default.copy(req.body);
    (0, _cloudantClient.insert)(message, function (err, message) {
        if (err) {
            return (0, _responseProcessing.process)({ status: 500, data: new _errorModel2.default('E100', 'Failed to store message.') }, req, res);
        } else {
            return (0, _responseProcessing.process)({ status: 201, data: message.getApiModel((0, _responseProcessing.getApiVersion)(req)) }, req, res);
        }
    });

    //});
}