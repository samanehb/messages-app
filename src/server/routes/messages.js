import createMessage  from '../controllers/messages/createMessage';
import getMessage     from '../controllers/messages/getMessage';
const express = require('express');
const router = express.Router();

router.get('/messages/:messageId', getMessage);

router.post('/messages', createMessage);

//router.use('/', () => {});

module.exports = router;