// src/models/subcategoria.model.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Subcategoria = sequelize.define('Subcategoria', {
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true,
    field: 'DMSB_ID',
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'DMSB_NOMBRE',
  },
  categoriaId: {
    type: DataTypes.BIGINT,
    allowNull: false,
    field: 'DCCAT_CATEGORIAS_DCCA_ID',
  },
}, {
  tableName: 'dmsub_subcategorias',
  timestamps: false,
});

module.exports = Subcategoria;