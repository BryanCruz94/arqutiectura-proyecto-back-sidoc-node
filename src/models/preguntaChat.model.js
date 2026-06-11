// src/models/preguntaChat.model.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const PreguntaChat = sequelize.define('PreguntaChat', {
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true,
    field: 'DPRG_ID',
  },
  pregunta: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'DPRG_PREGUNTA',
  },
  tipoPregunta: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'DPRG_TIPO_PRE',
  },
  tiempoRespuesta: {
    type: DataTypes.INTEGER,
    allowNull: true,
    field: 'DPRG_TIEMPO_RESP',
  },
  apiKey: {
    type: DataTypes.STRING,
    allowNull: true,
    field: 'DPRG_API_KEY',
  },
  cantTokens: {
    type: DataTypes.INTEGER,
    allowNull: true,
    field: 'DPRG_CANT_TOKENS',
  },
}, {
  tableName: 'dprg_preguntas_chat',
  timestamps: false,
});

module.exports = PreguntaChat;