# SIDOC Backend Node.js

API REST desarrollada con Node.js y Express para el chatbot de SIDOC. Consulta los manuales almacenados en MySQL, envía contexto a OpenAI para responder preguntas y protege sus endpoints mediante tokens JWT emitidos por Auth0.

## Arquitectura básica

El proyecto usa una arquitectura por capas:

- `routes/`: definición de endpoints del chatbot.
- `controllers/`: recepción y validación de solicitudes.
- `services/`: lógica de consulta y comunicación con OpenAI.
- `models/`: entidades Sequelize asociadas a MySQL.
- `config/`: conexión a base de datos y validación de Auth0.

Flujo principal: `Frontend Angular -> Express/Auth0 -> servicio de chatbot -> MySQL y OpenAI`.

## Requisitos y configuración

- Node.js 18 o superior.
- Una base de datos MySQL accesible.
- Credenciales de OpenAI y configuración de Auth0.

Cree un archivo `.env` con las variables necesarias:

```env
NODE_ENV=development
PORT=3000
DB_HOST=localhost
DB_PORT=3306
DB_NAME=sidoc
DB_USER=root
DB_PASSWORD=change_me
OPENAI_API_KEY=change_me
OPENAI_API_KEY2=change_me
OPENAI_MODEL=gpt-4o-mini
AUTH0_ISSUER_BASE_URL=https://tu-tenant.auth0.com/
AUTH0_JWK_SET_URI=https://tu-tenant.auth0.com/.well-known/jwks.json
AUTH0_AUDIENCE=https://sidoc-api
CORS_ALLOWED_ORIGIN=http://localhost:4200
```

## Desarrollo

```bash
npm install
npm run dev
```

La API queda disponible por defecto en `http://localhost:3000/cedmt/sidoc/node` y se reinicia automáticamente al modificar el código.

## Producción

Defina las variables de entorno con valores de producción y ejecute:

```bash
npm ci --omit=dev
set NODE_ENV=production
npm start
```

En Linux/macOS use `export NODE_ENV=production` en lugar de `set`. En una plataforma administrada, configure `NODE_ENV` desde su panel y use `npm start` como comando de inicio.
