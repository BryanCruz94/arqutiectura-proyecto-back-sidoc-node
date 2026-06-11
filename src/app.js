const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const { checkJwt } = require('./config/auth0');
const chatRoutes = require('./routes/chat.routes');

const app = express();

app.use(helmet());
app.use(morgan('dev'));

app.use(cors({
  origin: process.env.CORS_ALLOWED_ORIGIN,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Authorization', 'Content-Type'],
  exposedHeaders: ['Authorization'],
  credentials: false,
}));

// Importante: el frontend manda texto plano
app.use(express.text({ type: '*/*' }));

app.get('/actuator/health', (req, res) => {
  res.json({ status: 'UP' });
});

app.use(checkJwt);

app.use('/cedmt/sidoc/api/node/chat', chatRoutes);

app.use((req, res) => {
  res.status(404).json({
    message: 'Ruta no encontrada',
  });
});

app.use((err, req, res, next) => {
  console.error(err);

  res.status(err.status || 500).json({
    message: err.message || 'Error interno del servidor',
  });
});

module.exports = app;