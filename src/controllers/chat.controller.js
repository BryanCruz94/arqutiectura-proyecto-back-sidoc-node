// src/controllers/chat.controller.js
const chatAIService = require('../services/chatAI.service');

async function chatOpenAI(req, res) {
  try {
    const userMessage =
      typeof req.body === 'string'
        ? req.body
        : req.body?.message || JSON.stringify(req.body);

    const response = await chatAIService.chatBot(
      userMessage,
      process.env.OPENAI_MODEL,
      'OpenAI'
    );

    res.type('text/plain').send(response);
  } catch (error) {
    res.status(500).send(`Error al procesar la solicitud: ${error.message}`);
  }
}

async function getActiveManuals(req, res) {
  try {
    const manuals = await chatAIService.getManuals();
    res.json(manuals);
  } catch (error) {
    res.status(500).json({
      message: 'Error al obtener manuales activos',
      error: error.message,
    });
  }
}

module.exports = {
  chatOpenAI,
  getActiveManuals,
};