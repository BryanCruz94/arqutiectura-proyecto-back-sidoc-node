// src/models/tipo.model.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Tipo = sequelize.define('Tipo', {
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true,
    field: 'DMTY_ID',
  },
  codigo: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'DMTY_CODIGO',
  },
  nombreTipo: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'DMTY_NOMBRE_TIPO',
  },
  estado: {
    type: DataTypes.CHAR(1),
    allowNull: false,
    field: 'DMTY_ESTADO',
  },
}, {
  tableName: 'dmtyp_tipos',
  timestamps: false,
});

module.exports = Tipo;