'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = getMessage;

var _responseProcessing = require('../../helpers/responseProcessing');

var _cloudantClient = require('../../database/cloudantClient');

var _messageModel = require('../../models/messageModel');

var _messageModel2 = _interopRequireDefault(_messageModel);

var _errorModel = require('../../models/errorModel');

var _errorModel2 = _interopRequireDefault(_errorModel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getMessage(req, res) {
    var messageId = req.params ? req.params.messageId : undefined;
    //return new Promise((resolve, reject) => {
    if (!messageId) {
        return (0, _responseProcessing.process)({ status: 400, data: new _errorModel2.default('E101', 'Provide a message Id as path parameter.') }, req, res);
    } else {
        var message = new _messageModel2.default('TODO', messageId);
        return (0, _responseProcessing.process)({ status: 200, data: message.getApiModel((0, _responseProcessing.getApiVersion)(req)) }, req, res);
    }
    //});
}