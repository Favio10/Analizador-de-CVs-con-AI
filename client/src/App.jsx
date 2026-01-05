// client/src/App.jsx
import { useState } from 'react';

function App() {
  const [cv, setCv] = useState('');
  const [job, setJob] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    if (!cv || !job) return alert('Por favor completa ambos campos');
    setLoading(true);
    setResult('');

    try {
      const response = await fetch('https://analizador-de-cvs-con-ai.onrender.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cvText: cv, jobDescription: job }),
      });
      const data = await response.json();
      setResult(data.analysis || data.error);
    } catch (error) {
      setResult('Error de conexión con el servidor.');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8 font-sans">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-blue-700 mb-2">🚀 AI CV Analyzer</h1>
        <p className="text-gray-600 mb-8">Descubre qué le falta a tu perfil para ese puesto soñado.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Inputs */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tu Currículum (Texto)</label>
              <textarea
                className="w-full h-40 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Pega aquí tu CV..."
                value={cv}
                onChange={(e) => setCv(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Descripción del Puesto</label>
              <textarea
                className="w-full h-40 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Pega aquí la vacante..."
                value={job}
                onChange={(e) => setJob(e.target.value)}
              />
            </div>
            <button
              onClick={handleAnalyze}
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition disabled:bg-gray-400"
            >
              {loading ? 'Analizando con IA...' : 'Analizar Compatibilidad'}
            </button>
          </div>

          {/* Resultados */}
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Resultado del Análisis</h2>
            {result ? (
              <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">
                {result}
              </div>
            ) : (
              <p className="text-gray-400 italic">Los resultados aparecerán aquí...</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;