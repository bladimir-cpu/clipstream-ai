"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function CreateStudio() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'youtube' | 'text' | 'file' | 'images'>('text');
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const [generated, setGenerated] = useState(false);
  const [downloadingId, setDownloadingId] = useState<number | null>(null);
  const [credits, setCredits] = useState<number>(100);

  // Cargamos los créditos del usuario desde la sesión local al abrir el estudio
  useEffect(() => {
    const sessionStr = localStorage.getItem('clipstream_session');
    if (sessionStr) {
      const session = JSON.parse(sessionStr);
      setCredits(session.credits !== undefined ? session.credits : 100);
    }
  }, []);

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Verificamos si tiene créditos disponibles
    if (credits <= 0) {
      alert("¡Te has quedado sin créditos! Por favor recarga para seguir creando clips virales.");
      router.push('/pricing');
      return;
    }

    setLoading(true);
    setGenerated(false);

    setTimeout(() => {
      setLoading(false);
      setGenerated(true);
      
      // Restamos 1 crédito por cada generación exitosa
      const newCredits = credits - 1;
      setCredits(newCredits);

      const sessionStr = localStorage.getItem('clipstream_session');
      if (sessionStr) {
        const session = JSON.parse(sessionStr);
        session.credits = newCredits;
        localStorage.setItem('clipstream_session', JSON.stringify(session));
      }
    }, 1800);
  };

  const handleDownload = (clipNumber: number) => {
    setDownloadingId(clipNumber);
    setTimeout(() => {
      const videoUrl = "https://www.w3schools.com/html/mov_bbb.mp4";
      const element = document.createElement("a");
      element.href = videoUrl;
      element.download = `ClipStream_Viral_Extracto_${clipNumber}.mp4`;
      element.target = "_blank";
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
      setDownloadingId(null);
    }, 1500);
  };

  const handleLogout = () => {
    localStorage.removeItem('clipstream_session');
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-[#0B0F19] text-white p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Menú Superior Profesional Estilo App */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-[#161D2E] border border-gray-800 p-4 rounded-2xl shadow-xl">
          
          {/* Enlaces de Navegación del Menú */}
          <div className="flex items-center gap-4 text-xs md:text-sm font-medium">
            <a href="/" className="text-gray-400 hover:text-purple-400 transition">
              ← Inicio
            </a>
            <span className="text-gray-700">|</span>
            <span className="text-purple-400 font-semibold flex items-center gap-1">
              🎬 Generar Videos
            </span>
            <span className="text-gray-700">|</span>
            <button 
              onClick={() => router.push('/pricing')}
              className="text-gray-400 hover:text-purple-400 transition cursor-pointer"
            >
              💎 Planes y Precios
            </button>
          </div>
          
          {/* Zona de Estado de Usuario (Créditos, Recarga y Salida) */}
          <div className="flex flex-wrap items-center gap-2.5">
            <div className="text-xs bg-purple-600/20 border border-purple-500/30 px-3 py-1.5 rounded-xl font-medium text-purple-300">
              ⚡ Créditos: <strong className="text-white">{credits}</strong>
            </div>
            <button 
              onClick={() => router.push('/pricing')}
              className="px-3 py-1.5 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white text-xs font-bold rounded-xl transition shadow-md cursor-pointer"
            >
              🚀 Comprar Créditos
            </button>
            <button 
              onClick={handleLogout}
              className="px-3 py-1.5 bg-gray-800 hover:bg-red-600/20 hover:border-red-500/30 hover:text-red-400 border border-gray-700 text-gray-400 text-xs font-semibold rounded-xl transition cursor-pointer"
            >
              Salir
            </button>
          </div>
        </div>

        <div className="bg-[#161D2E] border border-gray-800 rounded-3xl p-6 shadow-2xl space-y-6">
          <h2 className="text-2xl font-bold">¿Qué deseas transformar hoy?</h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 bg-[#0B0F19] p-1.5 rounded-2xl border border-gray-800">
            <button 
              type="button"
              onClick={() => setActiveTab('youtube')}
              className={`py-3 px-2 rounded-xl text-xs md:text-sm font-semibold transition cursor-pointer ${activeTab === 'youtube' ? 'bg-purple-600 text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}
            >
              🔗 YouTube
            </button>
            <button 
              type="button"
              onClick={() => setActiveTab('text')}
              className={`py-3 px-2 rounded-xl text-xs md:text-sm font-semibold transition cursor-pointer ${activeTab === 'text' ? 'bg-purple-600 text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}
            >
              ✍️ Texto / Idea
            </button>
            <button 
              type="button"
              onClick={() => setActiveTab('file')}
              className={`py-3 px-2 rounded-xl text-xs md:text-sm font-semibold transition cursor-pointer ${activeTab === 'file' ? 'bg-purple-600 text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}
            >
              📁 Video / Audio
            </button>
            <button 
              type="button"
              onClick={() => setActiveTab('images')}
              className={`py-3 px-2 rounded-xl text-xs md:text-sm font-semibold transition cursor-pointer ${activeTab === 'images' ? 'bg-purple-600 text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}
            >
              🖼️ Subir Imágenes
            </button>
          </div>

          <form onSubmit={handleGenerate} className="space-y-4">
            {activeTab === 'youtube' && (
              <div>
                <label className="block text-xs text-gray-400 mb-1">Pega el enlace del video de YouTube</label>
                <input 
                  type="url" 
                  placeholder="https://www.youtube.com/watch?v=..." 
                  required
                  className="w-full p-3.5 rounded-xl bg-[#0B0F19] border border-gray-700 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-purple-500"
                />
              </div>
            )}

            {activeTab === 'text' && (
              <div>
                <label className="block text-xs text-gray-400 mb-1">Escribe tu idea o guion para que la IA cree el video</label>
                <textarea 
                  rows={4}
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Ej: Crea un video sobre hábitos matutinos para emprendedores..."
                  required
                  className="w-full p-3.5 rounded-xl bg-[#0B0F19] border border-gray-700 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-purple-500"
                />
              </div>
            )}

            {activeTab === 'file' && (
              <div className="border-2 border-dashed border-gray-700 rounded-2xl p-6 text-center bg-[#0B0F19]">
                <p className="text-sm text-gray-400 mb-2">Arrastra tu archivo de video o audio aquí</p>
                <input type="file" className="text-xs text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-purple-600 file:text-white hover:file:bg-purple-700 cursor-pointer"/>
              </div>
            )}

            {activeTab === 'images' && (
              <div className="border-2 border-dashed border-purple-500/50 rounded-2xl p-6 text-center bg-[#0B0F19] space-y-3">
                <div className="text-3xl">🖼️</div>
                <div>
                  <p className="text-sm font-medium text-purple-300">Sube tus imágenes para generar el video con IA</p>
                  <p className="text-xs text-gray-400 mt-1">Puedes seleccionar varias fotos (JPG, PNG)</p>
                </div>
                <input 
                  type="file" 
                  multiple 
                  accept="image/*"
                  className="text-xs text-gray-400 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-purple-600 file:text-white hover:file:bg-purple-700 cursor-pointer mx-auto block"
                />
              </div>
            )}

            <button 
              type="submit" 
              disabled={loading}
              className="w-full py-4 px-4 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold rounded-xl text-base transition shadow-xl disabled:opacity-50 cursor-pointer"
            >
              {loading ? '🚀 La IA está procesando y renderizando tu vídeo...' : '🚀 Generar Clips Virales con IA (-1 Crédito)'}
            </button>
          </form>

          {generated && (
            <div className="mt-8 space-y-4 pt-4 border-t border-gray-800">
              <h3 className="text-lg font-bold text-purple-400">🎉 ¡Clips Generados Exitosamente!</h3>
              
              {[
                { id: 1, title: 'Momento Clave #1 (Viral Hook)', duration: '45s' },
                { id: 2, title: 'Extracto de Alto Impacto #2', duration: '30s' },
                { id: 3, title: 'Conclusión y Llamado a la Acción', duration: '55s' }
              ].map((clip) => (
                <div key={clip.id} className="bg-[#0B0F19] border border-gray-800 p-4 rounded-2xl flex justify-between items-center">
                  <div>
                    <h4 className="font-semibold text-sm">{clip.title}</h4>
                    <p className="text-xs text-gray-400">Duración: {clip.duration} • Formato óptimo 9:16 (TikTok / Reels)</p>
                  </div>
                  <button 
                    type="button"
                    onClick={() => handleDownload(clip.id)}
                    disabled={downloadingId === clip.id}
                    className="py-2 px-4 bg-purple-600 hover:bg-purple-700 text-white text-xs font-semibold rounded-xl transition shadow-md disabled:opacity-50 cursor-pointer"
                  >
                    {downloadingId === clip.id ? 'Descargando MP4...' : '⬇️ Descargar MP4'}
                  </button>
                </div>
              ))}
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
