import { useState } from 'react';

function App() {
  const [cv, setCv] = useState('');
  const [job, setJob] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    if (!cv || !job) return alert('⚠️ Por favor completa ambos campos para iniciar el análisis.');
    setLoading(true);
    setResult('');

    try {
      // Reemplaza esto con TU URL de Render si es necesario, o déjalo dinámico
      const API_URL = 'https://analizador-de-cvs-con-ai.onrender.com/api/analyze'; 
      
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cvText: cv, jobDescription: job }),
      });
      
      const data = await response.json();
      setResult(data.analysis || data.error);
    } catch (error) {
      setResult('❌ Error de conexión: El servidor no responde. Intenta nuevamente en unos segundos.');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-indigo-100 selection:text-indigo-700">
      
      {/* HEADER / HERO SECTION */}
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-6 py-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-3xl">🚀</span>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
                AI Career Consultant
              </h1>
              <p className="text-xs text-slate-500 font-medium tracking-wide">POWERED BY OPENAI</p>
            </div>
          </div>
          <a href="#" className="hidden md:block text-sm font-medium text-slate-500 hover:text-indigo-600 transition">
            By Favio Olivera
          </a>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-10">
        
        <div className="text-center mb-10 max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">
            Optimiza tu perfil profesional <br />
            <span className="text-indigo-600">con Inteligencia Artificial</span>
          </h2>
          <p className="text-slate-600 text-lg">
            Pega tu CV y la vacante que deseas. Nuestra IA analizará la compatibilidad y te dirá exactamente qué mejorar para conseguir la entrevista.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          
          {/* COLUMNA IZQUIERDA: INPUTS */}
          <div className="space-y-6">
            
            {/* Input CV */}
            <div className="bg-white p-1 rounded-2xl shadow-sm border border-slate-200 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:border-transparent transition-all">
              <div className="bg-slate-50 px-4 py-2 rounded-t-xl border-b border-slate-100 flex items-center justify-between">
                <label className="text-sm font-bold text-slate-700 uppercase tracking-wider">1. Tu Currículum</label>
                <span className="text-xs text-slate-400">Texto plano</span>
              </div>
              <textarea
                className="w-full h-48 p-4 bg-white rounded-b-xl focus:outline-none text-slate-700 placeholder:text-slate-300 resize-none text-sm leading-relaxed"
                placeholder="Pega aquí el texto completo de tu CV..."
                value={cv}
                onChange={(e) => setCv(e.target.value)}
              />
            </div>

            {/* Input Job */}
            <div className="bg-white p-1 rounded-2xl shadow-sm border border-slate-200 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:border-transparent transition-all">
              <div className="bg-slate-50 px-4 py-2 rounded-t-xl border-b border-slate-100 flex items-center justify-between">
                <label className="text-sm font-bold text-slate-700 uppercase tracking-wider">2. La Vacante</label>
                <span className="text-xs text-slate-400">Descripción del puesto</span>
              </div>
              <textarea
                className="w-full h-48 p-4 bg-white rounded-b-xl focus:outline-none text-slate-700 placeholder:text-slate-300 resize-none text-sm leading-relaxed"
                placeholder="Pega aquí los requisitos del trabajo..."
                value={job}
                onChange={(e) => setJob(e.target.value)}
              />
            </div>

            {/* Botón de Acción */}
            <button
              onClick={handleAnalyze}
              disabled={loading}
              className={`w-full group relative py-4 px-6 rounded-xl font-bold text-white shadow-lg shadow-indigo-200 transition-all transform hover:-translate-y-1 hover:shadow-indigo-300
                ${loading ? 'bg-slate-400 cursor-not-allowed' : 'bg-gradient-to-r from-indigo-600 to-violet-600 hover:opacity-90'}
              `}
            >
              <div className="flex items-center justify-center gap-2">
                {loading ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Analizando perfil con GPT-4...</span>
                  </>
                ) : (
                  <>
                    <span>Generar Análisis Profesional</span>
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </>
                )}
              </div>
            </button>
          </div>

          {/* COLUMNA DERECHA: RESULTADOS */}
          <div className={`relative min-h-[500px] rounded-2xl border transition-all duration-500 
            ${result ? 'bg-white border-indigo-100 shadow-xl shadow-indigo-100/50' : 'bg-slate-100 border-dashed border-slate-300 flex items-center justify-center'}
          `}>
            
            {result ? (
              <div className="p-8 animate-fade-in-up">
                <div className="flex items-center gap-3 mb-6 pb-6 border-b border-slate-100">
                  <div className="bg-green-100 p-2 rounded-lg text-green-600">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                  </div>
                  <h3 className="text-xl font-bold text-slate-800">Resultado del Análisis</h3>
                </div>
                
                <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed whitespace-pre-wrap">
                  {result}
                </div>
              </div>
            ) : (
              <div className="text-center p-8 max-w-sm mx-auto opacity-60">
                <svg className="w-16 h-16 mx-auto mb-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path></svg>
                <p className="text-slate-500 font-medium">Los resultados aparecerán aquí.</p>
                <p className="text-sm text-slate-400 mt-2">La IA evaluará tus fortalezas, debilidades y porcentaje de match.</p>
              </div>
            )}
          </div>

        </div>
      </main>
    </div>
  );
}

export default App;