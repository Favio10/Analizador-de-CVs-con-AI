// server/index.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { OpenAI } = require('openai'); // Mantenemos la importación por si luego pones la key

const app = express();
app.use(cors());
app.use(express.json());

// Verificamos si hay KEY, si no, usaremos modo SIMULADOR
const apiKey = process.env.OPENAI_API_KEY;
let openai = null;

if (apiKey && apiKey.length > 5) {
  openai = new OpenAI({ apiKey: apiKey });
  console.log("✅ API Key detectada. Modo REAL activado.");
} else {
  console.log("⚠️ No se detectó API Key. Usando modo SIMULADOR (Mock).");
}

app.post('/api/analyze', async (req, res) => {
  const { cvText, jobDescription } = req.body;

  // --- MODO SIMULADOR (SIN API KEY) ---
  if (!openai) {
    console.log("🤖 Simulando análisis de IA...");
    
    // Simulamos un retraso de 2 segundos para que parezca real
    setTimeout(() => {
      res.json({
        analysis: `
[MODO SIMULADOR ACTIVADO]
Este es un análisis generado automáticamente porque no hay API Key configurada.

✅ Puntos Fuertes:
1. Experiencia sólida en Javascript y Node.js detectada en el CV.
2. El candidato muestra proactividad al tener proyectos personales.
3. Formación académica en curso (UTN) es un gran plus.

❌ Debilidades a mejorar:
1. Falta evidencia de tests automatizados (QA/Testing).
2. El portfolio no tiene proyectos desplegados en producción.
3. Faltan palabras clave de tecnologías cloud (AWS/Azure).

📊 Compatibilidad estimada: 75%
        `
      });
    }, 2000);
    return; 
  }

  // --- MODO REAL (CON API KEY) ---
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "Eres un experto reclutador IT. Analiza el CV del candidato contra la descripción del trabajo. Dame 3 puntos fuertes, 3 debilidades críticas y un porcentaje de compatibilidad. Sé directo."
        },
        {
          role: "user",
          content: `CV: ${cvText}\n\nJOB: ${jobDescription}`
        },
      ],
    });
    res.json({ analysis: completion.choices[0].message.content });
  } catch (error) {
    console.error("Error de OpenAI:", error);
    res.status(500).json({ error: "Error al conectar con OpenAI." });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Servidor listo en http://localhost:${PORT}`));