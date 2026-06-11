// src/config/database.js
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    dialect: 'mysql',
    timezone: '+00:00',
    logging: process.env.NODE_ENV === 'development' ? console.log : false,
    dialectOptions: {
      dateStrings: true,
      typeCast: true,
    },
  }
);

module.exports = sequelize;