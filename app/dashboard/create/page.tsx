'use client';

import { useState, useEffect } from 'react';

type ClipResult = { id: number; title: string; url: string };

export default function DashboardCreatePage() {
  const [userEmail, setUserEmail] = useState('');
  const [credits, setCredits] = useState<number>(10);
  const [activeTab, setActiveTab] = useState<'video' | 'text' | 'image' | 'prompt'>('video');
  const [inputData, setInputData] = useState('');
  const [processing, setProcessing] = useState(false);
  const [results, setResults] = useState<ClipResult[]>([]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const email = localStorage.getItem('clipstream_user_email');
      if (email) {
        setUserEmail(email);
        const savedCredits = localStorage.getItem(`clipstream_credits_${email}`);
        if (savedCredits !== null) {
          setCredits(Number(savedCredits));
        } else {
          localStorage.setItem(`clipstream_credits_${email}`, '10');
          setCredits(10);
        }
      }
    }
  }, []);

  const handleProcess = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputData && activeTab !== 'video') {
      alert('Por favor ingresa la información requerida.');
      return;
    }

    if (credits <= 0) {
      alert('Te has quedado sin créditos. Visita la sección de Planes y Precios para recargar.');
      return;
    }

    setProcessing(true);
    setResults([]);

    setTimeout(() => {
      setProcessing(false);
      const newCredits = credits - 1;
      setCredits(newCredits);
      if (typeof window !== 'undefined' && userEmail) {
        localStorage.setItem(`clipstream_credits_${userEmail}`, newCredits.toString());
      }
      
      // Activamos la aparición de los 3 clips de descarga abajo
      setResults([
        { id: 1, title: 'Clip Corto Viral (9:16 - TikTok/Reels)', url: '#' },
        { id: 2, title: 'Clip Dinámico Extendido', url: '#' },
        { id: 3, title: 'Clip Resumen Formato Original', url: '#' }
      ]);

      alert(`¡Contenido procesado con éxito! Se ha descontado 1 crédito. Te quedan ${newCredits} créditos.`);
    }, 2000);
  };

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('clipstream_user_email');
      window.location.href = '/';
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* Header del Panel */}
      <header className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div className="flex justify-between items-center bg-slate-900/60 p-4 rounded-2xl border border-slate-800 backdrop-blur-md">
          <div className="flex items-center gap-2">
            <span className="text-xl">🚀</span>
            <span className="font-extrabold text-white tracking-wide">ClipStream AI Studio</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-xs text-amber-400 bg-amber-500/10 px-3 py-1.5 rounded-full border border-amber-500/20 font-bold">
              ⚡ Créditos: {credits} / 10
            </span>
            <button
              onClick={handleLogout}
              className="text-xs font-medium text-slate-300 hover:text-red-400 transition bg-slate-950 px-3 py-2 rounded-xl border border-slate-800 cursor-pointer"
            >
              Cerrar Sesión
            </button>
          </div>
        </div>
      </header>

      {/* Contenido Principal con las 4 Opciones Originales */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col justify-center">
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-semibold border border-blue-500/30">
              Kling AI Engine Activo
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white mt-4 tracking-tight">
              Selecciona el modo de <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">Creación Viral</span>
            </h1>
            <p className="text-slate-400 text-sm mt-2">
              Cada generación consume 1 crédito de tu cuenta.
            </p>
          </div>

          {/* Botones de las 4 Opciones */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-xl mx-auto mb-8">
            <button
              type="button"
              onClick={() => setActiveTab('video')}
              className={`py-3 px-4 rounded-xl text-xs font-bold transition cursor-pointer border ${
                activeTab === 'video'
                  ? 'bg-purple-600 text-white border-purple-500 shadow-lg shadow-purple-600/30'
                  : 'bg-slate-950 text-slate-400 border-slate-800 hover:bg-slate-800 hover:text-white'
              }`}
            >
              🎬 Video / URL
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('text')}
              className={`py-3 px-4 rounded-xl text-xs font-bold transition cursor-pointer border ${
                activeTab === 'text'
                  ? 'bg-purple-600 text-white border-purple-500 shadow-lg shadow-purple-600/30'
                  : 'bg-slate-950 text-slate-400 border-slate-800 hover:bg-slate-800 hover:text-white'
              }`}
            >
              📝 Texto
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('image')}
              className={`py-3 px-4 rounded-xl text-xs font-bold transition cursor-pointer border ${
                activeTab === 'image'
                  ? 'bg-purple-600 text-white border-purple-500 shadow-lg shadow-purple-600/30'
                  : 'bg-slate-950 text-slate-400 border-slate-800 hover:bg-slate-800 hover:text-white'
              }`}
            >
              🖼️ Imagen
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('prompt')}
              className={`py-3 px-4 rounded-xl text-xs font-bold transition cursor-pointer border ${
                activeTab === 'prompt'
                  ? 'bg-purple-600 text-white border-purple-500 shadow-lg shadow-purple-600/30'
                  : 'bg-slate-950 text-slate-400 border-slate-800 hover:bg-slate-800 hover:text-white'
              }`}
            >
              ✨ Prompt IA
            </button>
          </div>

          {/* Formulario Dinámico Original */}
          <form onSubmit={handleProcess} className="space-y-4 max-w-xl mx-auto">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                {activeTab === 'video' && 'Enlace de YouTube o Video'}
                {activeTab === 'text' && 'Guion o Texto base para los clips'}
                {activeTab === 'image' && 'Sube o enlaza tu imagen de referencia'}
                {activeTab === 'prompt' && 'Escribe el Prompt detallado para la Inteligencia Artificial'}
              </label>

              {activeTab === 'text' || activeTab === 'prompt' ? (
                <textarea
                  rows={4}
                  placeholder={activeTab === 'text' ? 'Pega tu texto o guion aquí...' : 'Ej: Crea un video viral sobre hábitos de éxito...'}
                  value={inputData}
                  onChange={(e) => setInputData(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 transition text-sm"
                />
              ) : (
                <input
                  type="text"
                  placeholder={
                    activeTab === 'video'
                      ? 'https://www.youtube.com/watch?v=...'
                      : 'https://tuservidor.com/imagen.jpg'
                  }
                  value={inputData}
                  onChange={(e) => setInputData(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3.5 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 transition text-sm"
                />
              )}
            </div>

            <button
              type="submit"
              disabled={processing || credits <= 0}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-bold py-4 px-6 rounded-xl transition shadow-lg shadow-purple-500/25 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 text-sm"
            >
              {processing ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a88 8 0 018-8v8H4z"></path>
                  </svg>
                  <span>Procesando con Kling AI (-1 Crédito)...</span>
                </>
              ) : (
                <>⚡ Generar Contenido (Costo: 1 Crédito)</>
              )}
            </button>
          </form>

          {/* BANDEJA DE LOS 3 CLIPS RESULTADOS (Aparece abajo al terminar) */}
          {results.length > 0 && (
            <div className="mt-10 pt-8 border-t border-slate-800 max-w-xl mx-auto">
              <h3 className="text-center text-white font-bold mb-4 text-sm">🎉 ¡Tus clips virales están listos para descargar!</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {results.map((clip) => (
                  <div key={clip.id} className="bg-slate-950 border border-slate-800 p-4 rounded-xl text-center space-y-3">
                    <div className="text-2xl">🎬</div>
                    <p className="text-xs font-medium text-slate-300">{clip.title}</p>
                    <a
                      href={clip.url}
                      onClick={(e) => { e.preventDefault(); alert('Simulación de descarga del ' + clip.title); }}
                      className="block w-full bg-purple-600/20 hover:bg-purple-600 text-purple-300 hover:text-white py-2 rounded-lg text-xs font-bold transition border border-purple-500/30 cursor-pointer"
                    >
                      📥 Descargar
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </main>
    </div>
  );
}
