'use strict';

var _createMessage = require('../controllers/messages/createMessage');

var _createMessage2 = _interopRequireDefault(_createMessage);

var _getMessage = require('../controllers/messages/getMessage');

var _getMessage2 = _interopRequireDefault(_getMessage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var express = require('express');
var router = express.Router();

router.get('/messages/:messageId', _getMessage2.default);

router.post('/messages', _createMessage2.default);

//router.use('/', () => {});

module.exports = router;