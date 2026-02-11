const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

const CASO_ESTUDIO = "El caso Uber es un ejemplo emblemático de cómo la ciberseguridad puede fallar tanto por negligencia corporativa como por el factor humano.\n\n**Primer hackeo (2016):**\nEl primer incidente ocurrió en 2016, cuando atacantes robaron datos de 57 millones de usuarios y conductores tras acceder a un repositorio privado de código. Sin embargo, el escándalo estalló realmente un año después, al revelarse que la empresa ocultó la brecha y pagó 100,000 dólares a los hackers bajo la apariencia de una recompensa por errores (bug bounty) para que borraran la información y guardaran silencio, lo que derivó en graves sanciones legales y la condena de su entonces jefe de seguridad.\n\n**Segundo hackeo (2022):**\nSeis años después, en 2022, Uber volvió a ser víctima de un ataque masivo, esta vez mediante ingeniería social. Un joven de 18 años logró engañar a un empleado a través de un ataque de fatiga MFA, bombardeándolo con notificaciones de autenticación hasta que este aceptó una por error o cansancio. Una vez dentro de la red interna, el atacante encontró credenciales de administrador expuestas en scripts internos, lo que le permitió tomar el control de herramientas críticas como Slack, Amazon Web Services y Google Workspace.\n\nEste doble hackeo subraya que incluso las mayores tecnológicas son vulnerables si descuidan la gestión de accesos y la formación de sus empleados.";

const PREGUNTAS_GUIA = [
  "¿Cuáles fueron las principales fallas de seguridad en cada incidente?",
  "¿Qué papel jugó el factor humano en la segunda brecha?",
  "¿Cómo impacta la gestión o encubrimiento de incidentes en la confianza de usuarios y reguladores?",
  "Desde una perspectiva de gobernanza, ¿qué consecuencias tiene maquillar un riesgo frente a comunicarlo de forma transparente, aunque resulte incómodo?"
];

const RUBRICA = "RÚBRICA DE EVALUACIÓN (5 criterios, máximo 20 puntos):\n\n1. COMPRENSIÓN DEL CASO (4 pts max)\n- Excelente (4): Demuestra comprensión integral del caso, identificando claramente los hechos, causas y consecuencias de ambos hackeos.\n- Bueno (3): Comprende el caso y sus elementos principales, con omisiones menores.\n- Regular (2): Comprensión parcial; confunde o ignora aspectos relevantes del caso.\n- Deficiente (1): No demuestra comprensión del caso o presenta errores conceptuales graves.\n\n2. REFLEXIÓN CRÍTICA (4 pts max)\n- Excelente (4): Analiza el caso con profundidad, cuestiona decisiones organizacionales y extrae lecciones claras y bien argumentadas.\n- Bueno (3): Presenta reflexión pertinente, aunque con análisis limitado o poco profundizado.\n- Regular (2): Reflexión superficial, centrada más en descripción que en análisis.\n- Deficiente (1): No hay reflexión crítica o se limita a repetir el contenido del caso.\n\n3. INTERACCIÓN EN EL FORO (4 pts max)\n- Excelente (4): Interactúa activamente con varios compañeros, aportando ideas que enriquecen y amplían el debate.\n- Bueno (3): Responde a otros participantes de forma pertinente y respetuosa.\n- Regular (2): Interacción mínima, con comentarios breves o poco sustanciales.\n- Deficiente (1): No interactúa con otros participantes o sus aportes no son relevantes.\n\n4. APLICACIÓN DE APRENDIZAJES (4 pts max)\n- Excelente (4): Propone acciones, medidas o buenas prácticas concretas aplicables a contextos reales de ciberseguridad.\n- Bueno (3): Presenta propuestas generales con relación al caso.\n- Regular (2): Las propuestas son vagas o poco conectadas con el análisis del caso.\n- Deficiente (1): No aplica los aprendizajes ni propone mejoras o soluciones.\n\n5. CALIDAD Y CLARIDAD DEL APORTE (4 pts max)\n- Excelente (4): Aporte bien estructurado, coherente, claro y con uso adecuado del lenguaje técnico.\n- Bueno (3): Aporte claro, aunque con problemas menores de organización o redacción.\n- Regular (2): Redacción confusa o poco estructurada, dificulta la comprensión.\n- Deficiente (1): Aporte desorganizado, poco claro o difícil de comprender.";

const SYSTEM_PROMPT_COMPANEROS = "Eres un simulador de foro académico para el Diplomado en Ciberseguridad de Anáhuac Online. Tu rol es generar réplicas realistas de compañeros de clase que respondan a las intervenciones del estudiante sobre el caso del doble hackeo de Uber.\n\nCONTEXTO DEL CASO:\n" + CASO_ESTUDIO + "\n\nPREGUNTAS DE DISCUSIÓN:\n" + PREGUNTAS_GUIA.map(function(p, i) { return (i + 1) + ". " + p; }).join("\n") + "\n\nINSTRUCCIONES PARA GENERAR RÉPLICAS:\n\n1. Genera EXACTAMENTE 2 réplicas de compañeros ficticios con nombres hispanos realistas.\n\n2. Cada réplica debe:\n- Comenzar con el nombre del compañero en negritas\n- Responder directamente a algo que el estudiante mencionó\n- Aportar una perspectiva diferente, ejemplo adicional o pregunta reflexiva\n- Mantener un tono académico pero accesible\n- Incluir conceptos relevantes como: gestión del riesgo, ingeniería social, fatiga MFA, gobernanza de TI, transparencia corporativa, cumplimiento normativo, cultura de seguridad, etc.\n\n3. Las réplicas deben simular un debate real:\n- Un compañero puede estar de acuerdo y profundizar\n- Otro puede presentar un contraargumento o perspectiva alternativa\n- Pueden hacer preguntas que inviten a reflexionar más\n\n4. Vincula las réplicas con:\n- Gestión del riesgo y rendición de cuentas\n- Gobernanza de TI y seguridad de la información\n- Factor humano en ciberseguridad\n- Ética y transparencia corporativa\n- Marcos de cumplimiento y regulaciones\n\n5. Longitud: Cada réplica entre 80-150 palabras.\n\nFormato de respuesta:\n**[Nombre del compañero 1]:**\n[Réplica 1]\n\n**[Nombre del compañero 2]:**\n[Réplica 2]";

const SYSTEM_PROMPT_EVALUACION = "Eres un evaluador académico experto en ciberseguridad para el Diplomado en Ciberseguridad de Anáhuac Online. Tu tarea es evaluar formativamente la participación completa del estudiante en el foro sobre el doble hackeo de Uber.\n\nCONTEXTO DEL CASO:\n" + CASO_ESTUDIO + "\n\nPREGUNTAS DE DISCUSIÓN QUE DEBIÓ ABORDAR:\n" + PREGUNTAS_GUIA.map(function(p, i) { return (i + 1) + ". " + p; }).join("\n") + "\n\n" + RUBRICA + "\n\nINSTRUCCIONES DE EVALUACIÓN:\n\nProporciona una evaluación formativa estructurada que incluya:\n\n1. **Resumen de la participación**: Sintetiza brevemente los puntos principales que el estudiante abordó.\n\n2. **Evaluación por criterio**: Para cada uno de los 5 criterios de la rúbrica:\n- Asigna una puntuación (1-4)\n- Justifica brevemente la calificación\n\n3. **Puntuación total**: Suma de los 5 criterios (máximo 20 puntos)\n\n4. **Fortalezas identificadas**: Lista las fortalezas más destacadas de su participación.\n\n5. **Áreas de oportunidad**: Indica qué conceptos, perspectivas o argumentos faltaron o podrían profundizarse. Considera conceptos como:\n- Gestión de vulnerabilidades y parches\n- Principio de mínimo privilegio\n- Segmentación de redes\n- Cultura de seguridad organizacional\n- Protocolos de respuesta a incidentes\n- Comunicación de crisis\n- Cumplimiento regulatorio (GDPR, leyes locales)\n\n6. **Recomendación**: Un siguiente paso concreto de aprendizaje.\n\nSé constructivo, específico y orientado al desarrollo profesional del estudiante en ciberseguridad.";

app.post('/api/chat', async function(req, res) {
  try {
    var messages = req.body.messages;
    var phase = req.body.phase;
    
    if (!process.env.ANTHROPIC_API_KEY) {
      return res.status(500).json({ 
        error: 'API key no configurada. Configura ANTHROPIC_API_KEY en las variables de entorno.' 
      });
    }

    var systemPrompt = phase === 'evaluation' ? SYSTEM_PROMPT_EVALUACION : SYSTEM_PROMPT_COMPANEROS;

    var conversationHistory = messages.map(function(m) {
      return {
        role: m.role === 'user' ? 'user' : 'assistant',
        content: m.content
      };
    });

    var response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 2500,
        system: systemPrompt,
        messages: conversationHistory
      })
    });

    if (!response.ok) {
      var errorData = await response.json().catch(function() { return {}; });
      throw new Error(errorData.error?.message || 'Error ' + response.status);
    }

    var data = await response.json();
    var assistantMessage = data.content.map(function(block) { return block.text || ''; }).join('\n');

    res.json({ response: assistantMessage });

  } catch (error) {
    console.error('Error en /api/chat:', error);
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/config', function(req, res) {
  res.json({
    caso: CASO_ESTUDIO,
    preguntas: PREGUNTAS_GUIA,
    titulo: 'Foro de Debate: Analizando el Doble Hackeo de Uber',
    objetivo: 'Identificar vulnerabilidades y estrategias de respuesta a incidentes cibernéticos, reflexionando sobre el factor humano en la seguridad digital y la transparencia.'
  });
});

app.get('/health', function(req, res) {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, function() {
  console.log('Servidor corriendo en puerto ' + PORT);
  console.log('Foro: Analizando el Doble Hackeo de Uber');
});
