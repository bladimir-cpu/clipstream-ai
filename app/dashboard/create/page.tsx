'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function CreateDashboardPage() {
  const [activeTab, setActiveTab] = useState<'youtube' | 'text' | 'upload' | 'image' | 'prompt'>('youtube');
  const [contentInput, setContentInput] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [resultClips, setResultClips] = useState<any[] | null>(null);
  const [userEmail, setUserEmail] = useState<string>('wladyreyes@gmail.com');

  useEffect(() => {
    const savedEmail = localStorage.getItem('clipstream_user_email') || sessionStorage.getItem('clipstream_user_email');
    if (savedEmail) {
      setUserEmail(savedEmail);
    }
  }, []);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResultClips(null);

    try {
      const payloadValue = selectedFile ? selectedFile.name : contentInput;

      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: activeTab, content: payloadValue }),
      });

      const data = await res.json();
      if (data.success) {
        setResultClips(data.clips);
      } else {
        alert(data.error || 'Hubo un error al generar los clips.');
      }
    } catch (err) {
      console.error(err);
      alert('Error de conexión.');
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = (title: string) => {
    const realVideoUrl = 'https://www.w3schools.com/html/mov_bbb.mp4';
    const a = document.createElement('a');
    a.href = realVideoUrl;
    a.download = `${title.replace(/[^a-zA-Z0-9]/g, '_')}.mp4`;
    a.target = '_blank';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-10 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Barra superior con 'Panel' en español */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8 bg-slate-900/60 p-4 rounded-2xl border border-slate-800 backdrop-blur-md">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-sm font-semibold text-purple-400 hover:text-purple-300 transition">
              ← Inicio
            </Link>
            <Link href="/dashboard/create" className="text-sm font-semibold text-slate-300 hover:text-white transition">
              Panel
            </Link>
            <Link href="/pricing" className="text-sm font-semibold text-slate-300 hover:text-white transition">
              Planes
            </Link>
          </div>

          <div className="flex items-center gap-3 flex-wrap justify-end">
            <span className="text-xs bg-slate-800 text-slate-300 px-3 py-1.5 rounded-lg border border-slate-700 font-medium flex items-center gap-1.5">
              👤 <span className="text-purple-300 font-semibold">{userEmail}</span>
            </span>

            <span className="text-xs bg-purple-500/20 text-purple-300 px-3 py-1.5 rounded-full border border-purple-500/30 font-medium">
              🎁 30 Créditos Gratis
            </span>

            <Link href="/login" className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold px-3 py-1.5 rounded-lg transition">
              🚪 Salir
            </Link>
          </div>
        </div>

        <div className="bg-slate-900/85 backdrop-blur-xl border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl">
          <h1 className="text-2xl font-extrabold text-white mb-2">
            ClipStream <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">AI Studio</span>
          </h1>
          <h2 className="text-lg font-medium text-slate-300 mb-6">¿Qué deseas transformar hoy?</h2>
          
          {/* Pestañas con selector limpio al cambiar */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 bg-slate-950 p-1.5 rounded-2xl border border-slate-800 mb-6">
            <button
              type="button"
              onClick={() => { setActiveTab('youtube'); setContentInput(''); setSelectedFile(null); }}
              className={`py-2 rounded-xl text-xs sm:text-sm font-semibold transition cursor-pointer ${activeTab === 'youtube' ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
            >
              🔗 YouTube
            </button>
            <button
              type="button"
              onClick={() => { setActiveTab('text'); setContentInput(''); setSelectedFile(null); }}
              className={`py-2 rounded-xl text-xs sm:text-sm font-semibold transition cursor-pointer ${activeTab === 'text' ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
            >
              ✍️ Texto
            </button>
            <button
              type="button"
              onClick={() => { setActiveTab('upload'); setContentInput(''); setSelectedFile(null); }}
              className={`py-2 rounded-xl text-xs sm:text-sm font-semibold transition cursor-pointer ${activeTab === 'upload' ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
            >
              📁 Video
            </button>
            <button
              type="button"
              onClick={() => { setActiveTab('image'); setContentInput(''); setSelectedFile(null); }}
              className={`py-2 rounded-xl text-xs sm:text-sm font-semibold transition cursor-pointer ${activeTab === 'image' ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
            >
              🖼️ Imagen
            </button>
            <button
              type="button"
              onClick={() => { setActiveTab('prompt'); setContentInput(''); setSelectedFile(null); }}
              className={`py-2 rounded-xl text-xs sm:text-sm font-semibold transition cursor-pointer ${activeTab === 'prompt' ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
            >
              ✨ Prompt IA
            </button>
          </div>

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
                <label className="block text-sm font-medium text-slate-300 mb-2">Escribe tu idea o guion</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Ej: Crea un video dinámico sobre 3 consejos..."
                  value={contentInput}
                  onChange={(e) => setContentInput(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 transition"
                />
              </div>
            )}

            {activeTab === 'upload' && (
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Sube tu archivo de video desde la computadora</label>
                <div className="flex items-center justify-center w-full">
                  <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-slate-800 border-dashed rounded-xl cursor-pointer bg-slate-950 hover:bg-slate-900 transition">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6 px-4 text-center">
                      <svg className="w-8 h-8 mb-2 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                      </svg>
                      <p className="text-sm text-slate-300 font-medium">
                        {selectedFile ? <span className="text-purple-300">📁 {selectedFile.name}</span> : 'Haz clic para seleccionar o arrastra tu video (MP4, MOV)'}
                      </p>
                    </div>
                    <input
                      type="file"
                      accept="video/*"
                      required={!selectedFile}
                      className="hidden"
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          setSelectedFile(e.target.files[0]);
                        }
                      }}
                    />
                  </label>
                </div>
              </div>
            )}

            {activeTab === 'image' && (
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Sube tu imagen base desde la computadora</label>
                <div className="flex items-center justify-center w-full">
                  <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-slate-800 border-dashed rounded-xl cursor-pointer bg-slate-950 hover:bg-slate-900 transition">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6 px-4 text-center">
                      <svg className="w-8 h-8 mb-2 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                      </svg>
                      <p className="text-sm text-slate-300 font-medium">
                        {selectedFile ? <span className="text-purple-300">🖼️ {selectedFile.name}</span> : 'Haz clic para seleccionar o arrastra tu imagen (PNG, JPG)'}
                      </p>
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      required={!selectedFile}
                      className="hidden"
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          setSelectedFile(e.target.files[0]);
                        }
                      }}
                    />
                  </label>
                </div>
              </div>
            )}

            {activeTab === 'prompt' && (
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Escribe un Prompt avanzado para la IA</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Ej: Genera una estructura de clips centrada en marketing de guerrilla..."
                  value={contentInput}
                  onChange={(e) => setContentInput(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 transition"
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
                  <span>La IA está analizando y creando tus clips...</span>
                </>
              ) : (
                <>🚀 Generar Clips Virales con IA</>
              )}
            </button>
          </form>

          {resultClips && (
            <div className="mt-8 pt-6 border-t border-slate-800">
              <h3 className="text-lg font-bold text-white mb-4">🎉 ¡Clips Generados Exitosamente por la IA!</h3>
              <div className="space-y-3">
                {resultClips.map((clip) => (
                  <div key={clip.id} className="bg-slate-950 border border-slate-800 p-4 rounded-xl flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-white text-sm">{clip.title}</p>
                      <span className="text-xs text-purple-400">Duración: {clip.duration} • Listo para TikTok / Reels</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleDownload(clip.title)}
                      className="bg-purple-600/20 hover:bg-purple-600/30 text-purple-300 text-xs font-bold px-3 py-2 rounded-lg border border-purple-500/30 transition cursor-pointer"
                    >
                      ⬇️ Descargar Clip
                    </button>
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
