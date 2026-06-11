// src/models/manual.model.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Manual = sequelize.define('Manual', {
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true,
    field: 'DMAN_ID',
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'DMAN_NOMBRE',
  },
  codigo: {
    type: DataTypes.STRING,
    field: 'DMAN_CODIGO',
  },
  observaciones: {
    type: DataTypes.STRING,
    field: 'DMAN_OBSERVACIONES',
  },
  anioPublicacion: {
    type: DataTypes.DATEONLY,
    field: 'DMAN_ANIO_PUB',
  },
  estado: {
    type: DataTypes.CHAR(1),
    allowNull: false,
    field: 'DMAN_ESTADO',
  },
  publicado: {
    type: DataTypes.CHAR(1),
    allowNull: false,
    field: 'DMAN_PUBLICADO',
  },
  urlImagen: {
    type: DataTypes.STRING,
    field: 'DMAN_URL_IMAGEN',
  },
  enlaceDescarga: {
    type: DataTypes.STRING,
    field: 'DMAN_ENLACE_DESC',
  },
  descripcion: {
    type: DataTypes.STRING(3500),
    field: 'DMAN_DESCRIPCION',
  },
  subcategoriaId: {
    type: DataTypes.BIGINT,
    field: 'DMSUB_SUBCATEGORIAS_DMSB_ID',
  },
  tipoId: {
    type: DataTypes.BIGINT,
    field: 'DMAN_TIPO_ID',
  },
  categoriaId: {
    type: DataTypes.BIGINT,
    field: 'DMAN_CATEGORIA_ID',
  },
}, {
  tableName: 'dman_manuales',
  timestamps: false,
});

module.exports = Manual;