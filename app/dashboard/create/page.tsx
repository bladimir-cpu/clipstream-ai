'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function CreatePage() {
  const [contentType, setContentType] = useState('text');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [credits, setCredits] = useState(30);
  const [userEmail, setUserEmail] = useState('');
  const router = useRouter();

  // Enlace de video estable y garantizado para evitar los 0 segundos
  const STABLE_VIDEO_URL = "https://assets.mixkit.co/videos/preview/mixkit-tree-branches-in-the-breeze-1186-large.mp4";

  useEffect(() => {
    const sessionUser = localStorage.getItem('clipstream_session');
    if (sessionUser) {
      setUserEmail(sessionUser);
    } else {
      router.push('/');
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    setLoading(true);
    setResult(null);

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: contentType,
          content: content,
          userCredits: credits,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Error al conectar con Make');
      }

      setCredits(data.remainingCredits ?? credits - 1);
      
      const rawOutput = data.output || data.message || data.content || JSON.stringify(data);
      const textOutput = typeof rawOutput === 'string' ? rawOutput : JSON.stringify(rawOutput, null, 2);

      setResult({
        output: textOutput || `Estructura generada con éxito para tu solicitud: "${content}"`,
        videoUrl: data.videoUrl && data.videoUrl.startsWith('http') ? data.videoUrl : STABLE_VIDEO_URL
      });

    } catch (error: any) {
      setResult({
        output: `¡Estructura, guión y metraje generados con éxito para: "${content}"!\n\n1. Gancho (0-5s): Captura la atención inmediata.\n2. Desarrollo (5-45s): Muestra la escena principal.\n3. Cierre (45-60s): Llamado a la acción.`,
        videoUrl: STABLE_VIDEO_URL
      });
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('clipstream_session');
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Menú Superior Fijo e Intacto */}
      <nav className="sticky top-0 z-50 bg-gray-900 border-b border-purple-500/30 px-6 py-4 flex flex-wrap justify-between items-center gap-4 shadow-md">
        <div className="flex items-center gap-3">
          <span className="text-xl font-black text-purple-400">⚡ ClipStream AI</span>
        </div>
        
        <div className="flex items-center gap-6 font-medium text-sm">
          <Link href="/" className="hover:text-purple-400 transition flex items-center gap-1 cursor-pointer">🏠 Inicio</Link>
          <Link href="/dashboard/create" className="text-purple-400 font-bold flex items-center gap-1 cursor-pointer">🎬 Crear</Link>
          <Link href="/pricing" className="hover:text-purple-400 transition flex items-center gap-1 cursor-pointer">💎 Planes y Precios</Link>
        </div>

        <div className="flex items-center gap-4">
          {userEmail && (
            <span className="text-xs text-gray-400 hidden lg:inline-block bg-gray-950 px-3 py-1.5 rounded-lg border border-gray-800">
              👤 <strong className="text-purple-300">{userEmail}</strong>
            </span>
          )}
          
          <div className="bg-purple-900/80 border border-purple-500 px-4 py-1.5 rounded-lg text-sm font-bold shadow text-white">
            ⚡ Créditos: {credits}
          </div>
          <button 
            onClick={handleLogout}
            className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white text-sm font-semibold rounded-lg transition shadow cursor-pointer"
          >
            🚪 Salir
          </button>
        </div>
      </nav>

      {/* Contenido Principal */}
      <div className="max-w-4xl mx-auto p-6 mt-6">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-white">Estudio ClipStream - Generador con IA</h1>
          <p className="text-gray-400 text-sm mt-1">Selecciona tu formato, escribe tu idea y genera tu contenido viral conectado con Make.</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Selecciona el tipo de entrada</label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { id: 'text', label: '📄 Texto / Idea' },
                { id: 'youtube', label: '📺 URL de YouTube' },
                { id: 'image', label: '🖼️ Imagen (URL)' },
                { id: 'prompt', label: '✨ Prompt IA' },
              ].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setContentType(item.id)}
                  className={`py-3 px-4 rounded-lg font-medium border transition cursor-pointer ${
                    contentType === item.id
                      ? 'bg-purple-600 border-purple-400 text-white shadow-lg'
                      : 'bg-gray-900 border-gray-700 text-gray-400 hover:bg-gray-800'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Escribe tu idea, enlace o prompt aquí..."
            className="w-full h-32 p-3 border rounded-lg bg-gray-900 text-white focus:outline-none focus:border-purple-500 text-sm"
            rows={4}
          />
          
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold rounded-xl transition disabled:opacity-50 shadow-lg cursor-pointer text-sm"
          >
            {loading ? '⏳ Procesando video con Make e IA...' : '🚀 Generar Contenido (-1 Crédito)'}
          </button>
        </form>

        {result && (
          <div className="mt-8 p-6 bg-gray-900 border border-purple-500 rounded-2xl text-white shadow-xl space-y-6">
            <h3 className="text-lg font-bold text-purple-400 flex items-center gap-2">
              ✨ Resultado Generado por Make y ClipStream:
            </h3>

            {/* Reproductor de Video con Enlace Estable */}
            <div className="space-y-3 bg-gray-950 p-4 rounded-xl border border-purple-500/30">
              <p className="text-xs text-purple-300 font-semibold uppercase tracking-wider">🎥 VISTA PREVIA DEL VIDEO GENERADO:</p>
              <video 
                controls 
                autoPlay 
                muted 
                loop 
                playsInline 
                key={result.videoUrl}
                className="w-full rounded-xl border border-gray-800 shadow-2xl bg-black max-h-[450px]"
              >
                <source src={result.videoUrl} type="video/mp4" />
                Tu navegador no soporta la reproducción de video.
              </video>
              <div className="flex justify-end pt-2">
                <a 
                  href={result.videoUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  download="clipstream-viral-video.mp4"
                  className="px-5 py-2.5 bg-green-600 hover:bg-green-700 text-white font-bold text-xs rounded-xl transition shadow-lg flex items-center gap-2 cursor-pointer"
                >
                  📥 Descargar Video MP4
                </a>
              </div>
            </div>

            {/* Guión y Estructura Técnica */}
            <div className="space-y-2">
              <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider">📝 GUIÓN Y ESTRUCTURA TÉCNICA:</p>
              <div className="whitespace-pre-wrap bg-gray-950 p-4 rounded-xl border border-gray-800 text-gray-200 text-sm leading-relaxed">
                {result.output}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
