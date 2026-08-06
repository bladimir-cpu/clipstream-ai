'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function DashboardCreatePage() {
  const [userEmail, setUserEmail] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const email = localStorage.getItem('clipstream_user_email');
      if (email) {
        setUserEmail(email);
      }
    }
  }, []);

  const handleProcessVideo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!videoUrl) {
      alert('Por favor ingresa un enlace o archivo de video válido.');
      return;
    }

    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      alert('¡Video analizado con éxito por la IA! Generando clips virales...');
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
            <span className="text-xs text-purple-400 bg-purple-500/10 px-3 py-1.5 rounded-full border border-purple-500/20 hidden sm:inline-block">
              {userEmail || 'Sesión Activa'}
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

      {/* Contenido Principal del Panel de Creación */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col justify-center">
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-semibold border border-blue-500/30">
              Kling AI Engine Activo
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white mt-4 tracking-tight">
              Sube tu video y genera <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">clips virales</span>
            </h1>
            <p className="text-slate-400 text-sm mt-2">
              Pega el enlace de YouTube o arrastra tu video largo para que la inteligencia artificial extraiga los mejores momentos.
            </p>
          </div>

          <form onSubmit={handleProcessVideo} className="space-y-4 max-w-xl mx-auto">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Enlace de YouTube o Video</label>
              <input
                type="text"
                placeholder="https://www.youtube.com/watch?v=..."
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3.5 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 transition text-sm"
              />
            </div>

            <button
              type="submit"
              disabled={processing}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-bold py-4 px-6 rounded-xl transition shadow-lg shadow-purple-500/25 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 text-sm"
            >
              {processing ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                  </svg>
                  <span>Analizando video con IA...</span>
                </>
              ) : (
                <>⚡ Generar Clips Automáticos</>
              )}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
