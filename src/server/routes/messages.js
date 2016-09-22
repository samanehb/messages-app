import v1_createMessage  from '../controllers/v1/messages/createMessage';
import v1_deleteMessages     from '../controllers/v1/messages/deleteMessage';
import v1_getAllMessages     from '../controllers/v1/messages/getAllMessages';
import v1_getMessage     from '../controllers/v1/messages/getMessage';
import v1_getPalindrome     from '../controllers/v1/messages/getPalindrome';
import v2_getPalindrome     from '../controllers/v2/messages/getPalindrome';
const express = require('express');
const router = express.Router();

/****  V1 *****/
router.post('/v1/messages', v1_createMessage);
router.delete('/v1/messages/:messageId', v1_deleteMessages); // ??
router.get('/v1/messages', v1_getAllMessages);
router.get('/v1/messages/:messageId', v1_getMessage);

router.get('/v1/messages/:messageId/palindrome', v1_getPalindrome);


/****  V2 *****/
router.get('/v2/messages/:messageId/palindrome', v2_getPalindrome);

module.exports = router;