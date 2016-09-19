'use strict';

var _createMessage = require('./messages/createMessage');

// or export them and have something else...

var express = require('express');
var router = express.Router();

router.get('', function (req, res) {
  res.end('we are here');
});

router.post('/', _createMessage.createMessage);

router.get('/:messageId', function (req, res) {
  res.send(req.params);
});

module.exports = router;