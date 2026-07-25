'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function CreateDashboardPage() {
  const [activeTab, setActiveTab] = useState<'youtube' | 'text' | 'upload'>('youtube');
  const [contentInput, setContentInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [resultClips, setResultClips] = useState<any[] | null>(null);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResultClips(null);

    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: activeTab, content: contentInput }),
      });

      const data = await res.json();
      if (data.success) {
        setResultClips(data.clips);
      } else {
        alert('Hubo un error al generar los clips.');
      }
    } catch (err) {
      console.error(err);
      alert('Error de conexión.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-10 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Luces de fondo */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-4xl mx-auto relative z-10">
        
        {/* Barra superior */}
        <div className="flex justify-between items-center mb-8">
          <Link href="/" className="text-sm font-semibold text-purple-400 hover:text-purple-300 transition">
            ← Volver al inicio
          </Link>
          <h1 className="text-2xl font-extrabold text-white">
            ClipStream <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">AI Studio</span>
          </h1>
        </div>

        {/* Panel Principal */}
        <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl">
          
          <h2 className="text-xl font-bold text-white mb-4">¿Qué deseas transformar hoy?</h2>
          
          {/* Pestañas de selección */}
          <div className="grid grid-cols-3 gap-2 bg-slate-950 p-1.5 rounded-2xl border border-slate-800 mb-6">
            <button
              type="button"
              onClick={() => { setActiveTab('youtube'); setContentInput(''); }}
              className={`py-2.5 rounded-xl text-sm font-semibold transition cursor-pointer ${activeTab === 'youtube' ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
            >
              🔗 Enlace YouTube
            </button>
            <button
              type="button"
              onClick={() => { setActiveTab('text'); setContentInput(''); }}
              className={`py-2.5 rounded-xl text-sm font-semibold transition cursor-pointer ${activeTab === 'text' ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
            >
              ✍️ Texto / Idea
            </button>
            <button
              type="button"
              onClick={() => { setActiveTab('upload'); setContentInput(''); }}
              className={`py-2.5 rounded-xl text-sm font-semibold transition cursor-pointer ${activeTab === 'upload' ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
            >
              📁 Subir Archivo
            </button>
          </div>

          {/* Formulario Dinámico */}
          <form onSubmit={handleGenerate} className="space-y-6">
            {activeTab === 'youtube' && (
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Pega el enlace del video de YouTube</label>
                <input
                  type="url"
                  required
                  placeholder="https://www.youtube.com/watch?v=..."
                  value={contentInput}
                  onChange={(e) => setContentInput(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 transition"
                />
              </div>
            )}

            {activeTab === 'text' && (
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Escribe tu idea o guion para que la IA cree el video</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Ej: Crea un video dinámico sobre 3 consejos para mejorar la productividad digital..."
                  value={contentInput}
                  onChange={(e) => setContentInput(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 transition"
                />
              </div>
            )}

            {activeTab === 'upload' && (
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Sube tu archivo de video o audio</label>
                <input
                  type="text"
                  required
                  placeholder="Nombre o ruta del archivo de video (ej: video_clase.mp4)"
                  value={contentInput}
                  onChange={(e) => setContentInput(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 transition"
                />
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-bold py-4 px-6 rounded-xl transition shadow-lg shadow-purple-500/25 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                  </svg>
                  <span>La IA está procesando y creando tus clips...</span>
                </>
              ) : (
                <>🚀 Generar Clips Virales con IA</>
              )}
            </button>
          </form>

          {/* Resultados Generados */}
          {resultClips && (
            <div className="mt-8 pt-6 border-t border-slate-800">
              <h3 className="text-lg font-bold text-white mb-4">🎉 ¡Clips Generados Exitosamente!</h3>
              <div className="space-y-3">
                {resultClips.map((clip) => (
                  <div key={clip.id} className="bg-slate-950 border border-slate-800 p-4 rounded-xl flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-white text-sm">{clip.title}</p>
                      <span className="text-xs text-purple-400">Duración: {clip.duration} • Listo para TikTok / Reels</span>
                    </div>
                    {/* Botón convertido en enlace de descarga funcional */}
                    <a
                      href={clip.url || '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      download
                      className="bg-purple-600/20 hover:bg-purple-600/30 text-purple-300 text-xs font-bold px-3 py-2 rounded-lg border border-purple-500/30 transition cursor-pointer flex items-center gap-1"
                      onClick={(e) => {
                        if (!clip.url) {
                          e.preventDefault();
                          alert('El archivo multimedia se está preparando. Inténtalo de nuevo en unos segundos.');
                        }
                      }}
                    >
                      ⬇️ Descargar Clip
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
