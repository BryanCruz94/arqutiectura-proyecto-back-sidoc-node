// src/services/chatAI.service.js
const sequelize = require('../config/database');
const PreguntaChat = require('../models/preguntaChat.model');

const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';

async function sendChatRequest(userMessage, model, systemPrompt, apiKey) {
  try {
    const response = await fetch(OPENAI_API_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userMessage },
        ],
      }),
    });

    const responseBody = await response.json();

    const totalTokens = responseBody?.usage?.total_tokens || 0;

    const content = responseBody?.choices?.[0]?.message?.content;

    return {
      content: content ? content.trim() : 'Error en la respuesta del modelo.',
      totalTokens,
    };
  } catch (error) {
    return {
      content: `Error al procesar la solicitud: ${error.message}`,
      totalTokens: 0,
    };
  }
}

function getApiKey(provider) {
  if (provider === 'OpenAI') {
    return process.env.OPENAI_API_KEY;
  }

  throw new Error(`Proveedor no soportado: ${provider}`);
}

async function validateQuestion(userMessage, provider, model) {
  const apiKey = getApiKey(provider);

  const systemPrompt = `
Tu nombre es CEDiño, Eres un chatbot bibliotecario especializado en manuales, libros y reglamentos. 
Clasifica cada mensaje según las siguientes reglas:
1. Si la pregunta está relacionada con libros o manuales responde con '1'.
2. Si no tiene relación alguna, responde con '0'.
3. Si es un saludo o agradecimiento, responde educadamente, con tono militar y amablemente.
Devuelve solo la respuesta sin explicaciones adicionales.
`;

  return sendChatRequest(userMessage, model, systemPrompt, apiKey);
}

async function getManuals() {
  const [manuals] = await sequelize.query(`
  SELECT
    m.DMAN_NOMBRE AS nombre,
    c.DCCA_NOMBRE AS categoria,
    s.DMSB_NOMBRE AS subcategoria,
    m.DMAN_DESCRIPCION AS descripcion,
    CAST(m.DMAN_ANIO_PUB AS CHAR) AS anioPublicacion
  FROM dman_manuales m
  JOIN dmtyp_tipos t
    ON m.DMAN_TIPO_ID = t.DMTY_ID
  JOIN dmsub_subcategorias s
    ON m.DMSUB_SUBCATEGORIAS_DMSB_ID = s.DMSB_ID
  JOIN dccat_categorias c
    ON s.DCCAT_CATEGORIAS_DCCA_ID = c.DCCA_ID
  WHERE m.DMAN_ESTADO = '1'
    AND m.DMAN_PUBLICADO = '1'
`);

  return manuals;
}

async function getChatResponse(userMessage, model, provider) {
  const manuals = await getManuals();
  const jsonContext = JSON.stringify(manuals);

  const systemPrompt = `
Tu nombre es CEDiño, Eres un bibliotecario experto en la documentación del COMANDO DE EDUCACIÓN Y DOCTRINA MILITAR TERRESTRE DEL EJÉRCITO DEL ECUADOR.
Tu tarea es proporcionar información precisa y útil sobre los manuales, notas de aula y reglamentos publicados, asegurando respuestas formales y bien estructuradas.

**Instrucciones estrictas:**  
1️ Analiza rigurosamente la consulta del usuario y selecciona los manuales más relevantes con base en coincidencias exactas en el nombre, categoría, subcategoría y descripción.  
2 Si te solicitan la cantidad de documentos disponibles, responde primero con el número exacto y luego enlista los manuales.  
3 (NUNCA inventes nombres de manuales). Solo menciona los manuales que aparecen en la lista proporcionada.  
4 Excluye explicaciones innecesarias o información fuera del contexto de los manuales. 
5 Debes responder con un tono militar de Ecuador, pero sin perder la amabilidad. Responde como si fueras un subordinado de quien pregunta.
6 Tus respuestas deben ser claras y estructuradas en un formato de recomendación, como este ejemplo:  

- [Nombre del Manual] (Año de publicación): Breve descripción relevante (10-15 palabras).  

🔹 **Lista de manuales, reglamentos y notas de aula en JSON:**  
${jsonContext}
`;

  const apiKey = getApiKey(provider);
  return sendChatRequest(userMessage, model, systemPrompt, apiKey);
}

async function chatBot(userMessage, model, provider = 'OpenAI') {
  const inicio = Date.now();

  const validation = await validateQuestion(userMessage, provider, model);
  const messageType = validation.content;

  let respuesta;
  let tipoPregunta;
  let totalTokens = validation.totalTokens;

  if (messageType === '1') {
    tipoPregunta = 'Pregunta Válida';

    const chatResponse = await getChatResponse(userMessage, model, provider);
    respuesta = chatResponse.content;
    totalTokens = chatResponse.totalTokens;
  } else if (messageType === '0') {
    tipoPregunta = 'Pregunta No Válida';
    respuesta = 'No puedo responder tu pregunta, soy un chatbot bibliotecario. ¿Te puedo ayudar en algo más?';
  } else {
    tipoPregunta = 'Saludo o Agradecimiento';
    respuesta = messageType;
  }

  const fin = Date.now();
  const tiempoRespuesta = Math.floor((fin - inicio) / 10);

  await PreguntaChat.create({
    pregunta: userMessage,
    apiKey: provider,
    tipoPregunta,
    tiempoRespuesta,
    cantTokens: totalTokens,
  });

  return respuesta;
}

async function getManualAbstract(textoManual) {
  const systemPrompt = `
Eres un bibliotecario encargado de generar descripciones para Manuales, Notas de aula, Reglamentos, Libros y textos.
Analiza el texto proporcionado y elabora un resumen conciso y preciso que sirva como guía del documento.
El resumen debe tener entre 1000 y 1200 caracteres, evitando incluir detalles irrelevantes como códigos, nombres, fechas específicas, o contexto histórico
No incluyas en el resumen el nombre del libro, manual, nota de aula. Tampoco su código ni fecha de publicación.
`;

  const result = await sendChatRequest(
    textoManual,
    process.env.OPENAI_MODEL,
    systemPrompt,
    process.env.OPENAI_API_KEY2
  );

  return result.content;
}

module.exports = {
  chatBot,
  getManuals,
  getManualAbstract,
};