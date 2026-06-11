// src/models/categoria.model.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Categoria = sequelize.define('Categoria', {
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true,
    field: 'DCCA_ID',
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'DCCA_NOMBRE',
  },
}, {
  tableName: 'dccat_categorias',
  timestamps: false,
});

module.exports = Categoria;