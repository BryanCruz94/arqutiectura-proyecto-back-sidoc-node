const express = require('express');
const chatController = require('../controllers/chat.controller');

const router = express.Router();

router.post('/manualsQuestions', chatController.chatOpenAI);

router.get('/list', chatController.getActiveManuals);

module.exports = router;