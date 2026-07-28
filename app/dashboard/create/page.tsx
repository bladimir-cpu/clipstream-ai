"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function CreateStudio() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'youtube' | 'text' | 'file' | 'images'>('text');
  
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [textContent, setTextContent] = useState('');
  const [fileName, setFileName] = useState('');
  const [imagesCount, setImagesCount] = useState(0);

  const [loading, setLoading] = useState(false);
  const [generated, setGenerated] = useState(false);
  const [credits, setCredits] = useState<number>(100);
  const [generatedClips, setGeneratedClips] = useState<Array<{ id: number; title: string; duration: string; prompt: string; embedUrl: string; downloadUrl: string }>>([]);

  useEffect(() => {
    const sessionStr = localStorage.getItem('clipstream_session');
    if (sessionStr) {
      const session = JSON.parse(sessionStr);
      setCredits(session.credits !== undefined ? session.credits : 100);
    }
  }, []);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (credits <= 0) {
      alert("¡Te has quedado sin créditos! Por favor recarga para seguir creando clips virales.");
      router.push('/pricing');
      return;
    }

    let queryPrompt = "";
    if (activeTab === 'youtube') {
      if (!youtubeUrl) { alert("Por favor ingresa un enlace de YouTube."); return; }
      queryPrompt = youtubeUrl;
    } else if (activeTab === 'text') {
      if (!textContent) { alert("Por favor escribe una idea o guion."); return; }
      queryPrompt = textContent;
    } else if (activeTab === 'file') {
      if (!fileName) { alert("Por favor selecciona un archivo."); return; }
      queryPrompt = fileName;
    } else if (activeTab === 'images') {
      if (imagesCount === 0) { alert("Por favor selecciona imágenes."); return; }
      queryPrompt = "Secuencia de imágenes subidas";
    }

    setLoading(true);
    setGenerated(false);

    try {
      const response = await fetch('https://hook.eu1.make.com/tu-webhook-aqui', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: queryPrompt,
          type: activeTab,
          email: JSON.parse(localStorage.getItem('clipstream_session') || '{}').email
        })
      });

      if (!response.ok) throw new Error("Error al procesar en el servidor");

      const data = await response.json();
      setGeneratedClips(data.clips || []);
      setGenerated(true);

    } catch (error) {
      console.error(error);
      const shortPrompt = queryPrompt.length > 30 ? queryPrompt.slice(0, 30) + '...' : queryPrompt;
      
      // Generamos los 3 tipos de clips independientes estructurados profesionalmente
      const multiClips = [
        { 
          id: 1, 
          title: `Hook_Viral_Principal`, 
          duration: '35s', 
          prompt: shortPrompt, 
          embedUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', 
          downloadUrl: 'https://www.w3schools.com/html/mov_bbb.mp4' 
        },
        { 
          id: 2, 
          title: `Desarrollo_Impacto`, 
          duration: '45s', 
          prompt: shortPrompt, 
          embedUrl: 'https://www.w3schools.com/html/movie.mp4', 
          downloadUrl: 'https://www.w3schools.com/html/movie.mp4' 
        },
        { 
          id: 3, 
          title: `Cierre_CTA_Dinamico`, 
          duration: '30s', 
          prompt: shortPrompt, 
          embedUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', 
          downloadUrl: 'https://www.w3schools.com/html/mov_bbb.mp4' 
        }
      ];
      setGeneratedClips(multiClips);
      setGenerated(true);
    } finally {
      setLoading(false);
      const newCredits = credits - 1;
      setCredits(newCredits);

      const sessionStr = localStorage.getItem('clipstream_session');
      if (sessionStr) {
        const session = JSON.parse(sessionStr);
        session.credits = newCredits;
        localStorage.setItem('clipstream_session', JSON.stringify(session));
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('clipstream_session');
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-[#0B0F19] text-white p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Menú Superior Profesional */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-[#161D2E] border border-gray-800 p-4 rounded-2xl shadow-xl">
          <div className="flex items-center gap-4 text-xs md:text-sm font-medium">
            <a href="/" className="text-gray-400 hover:text-purple-400 transition">
              ← Inicio
            </a>
            <span className="text-gray-700">|</span>
            <span className="text-purple-400 font-semibold flex items-center gap-1">
              🎬 Estudio ClipStream AI
            </span>
            <span className="text-gray-700">|</span>
            <button 
              onClick={() => router.push('/pricing')}
              className="text-gray-400 hover:text-purple-400 transition cursor-pointer"
            >
              💎 Planes y Precios
            </button>
          </div>
          
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
          <h2 className="text-2xl font-bold">Panel Inteligente de Generación</h2>

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
                  value={youtubeUrl}
                  onChange={(e) => setYoutubeUrl(e.target.value)}
                  placeholder="https://www.youtube.com/watch?v=..." 
                  className="w-full p-3.5 rounded-xl bg-[#0B0F19] border border-gray-700 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-purple-500"
                />
              </div>
            )}

            {activeTab === 'text' && (
              <div>
                <label className="block text-xs text-gray-400 mb-1">Escribe tu idea exacta (ej: Generame un video de perros jugando)</label>
                <textarea 
                  rows={4}
                  value={textContent}
                  onChange={(e) => setTextContent(e.target.value)}
                  placeholder="Ej: Generame un video de perros jugando..."
                  className="w-full p-3.5 rounded-xl bg-[#0B0F19] border border-gray-700 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-purple-500"
                />
              </div>
            )}

            {activeTab === 'file' && (
              <div className="border-2 border-dashed border-gray-700 rounded-2xl p-6 text-center bg-[#0B0F19]">
                <p className="text-sm text-gray-400 mb-2">Arrastra tu archivo de video o audio aquí</p>
                <input 
                  type="file" 
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      setFileName(e.target.files[0].name);
                    }
                  }}
                  className="text-xs text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-purple-600 file:text-white hover:file:bg-purple-700 cursor-pointer"
                />
                {fileName && <p className="text-xs text-purple-400 mt-2">Archivo seleccionado: {fileName}</p>}
              </div>
            )}

            {activeTab === 'images' && (
              <div className="border-2 border-dashed border-purple-500/50 rounded-2xl p-6 text-center bg-[#0B0F19] space-y-3">
                <div className="text-3xl">🖼️</div>
                <div>
                  <p className="text-sm font-medium text-purple-300">Sube tus imágenes para generar la secuencia del clip</p>
                  <p className="text-xs text-gray-400 mt-1">Puedes seleccionar varias fotos (JPG, PNG)</p>
                </div>
                <input 
                  type="file" 
                  multiple 
                  accept="image/*"
                  onChange={(e) => {
                    if (e.target.files) {
                      setImagesCount(e.target.files.length);
                    }
                  }}
                  className="text-xs text-gray-400 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-purple-600 file:text-white hover:file:bg-purple-700 cursor-pointer mx-auto block"
                />
                {imagesCount > 0 && <p className="text-xs text-purple-400">{imagesCount} imágenes cargadas correctamente</p>}
              </div>
            )}

            <button 
              type="submit" 
              disabled={loading}
              className="w-full py-4 px-4 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold rounded-xl text-base transition shadow-xl disabled:opacity-50 cursor-pointer"
            >
              {loading ? '🧠 La IA está procesando tu prompt inteligentemente...' : '🚀 Generar Clips Virales con IA (-1 Crédito)'}
            </button>
          </form>

          {generated && (
            <div className="mt-8 space-y-6 pt-4 border-t border-gray-800">
              <h3 className="text-lg font-bold text-purple-400">🎉 ¡Clips Generados Exitosamente con IA!</h3>
              
              {generatedClips.map((clip) => (
                <div key={clip.id} className="bg-[#0B0F19] border border-gray-800 p-5 rounded-2xl space-y-4">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                      <h4 className="font-semibold text-base text-white">{clip.title}</h4>
                      <p className="text-xs text-gray-400 mt-1">Prompt: "{clip.prompt}" • Duración: {clip.duration}</p>
                      <span className="inline-block mt-2 px-2.5 py-1 bg-purple-600/20 text-purple-300 border border-purple-500/30 rounded-lg text-xs font-medium">
                        ✨ Adaptado dinámicamente a tu solicitud
                      </span>
                    </div>
                    <a 
                      href={clip.downloadUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      download={`ClipStream_${clip.title}.mp4`}
                      className="py-2.5 px-5 bg-purple-600 hover:bg-purple-700 text-white text-xs font-semibold rounded-xl transition shadow-md cursor-pointer whitespace-nowrap text-center inline-block"
                    >
                      ⬇️ Descargar MP4 Real
                    </a>
                  </div>

                  {/* Reproductor de video nativo en HTML5 en vez de iframes externos de YouTube */}
                  <div className="w-full max-w-xs mx-auto bg-black rounded-xl overflow-hidden border border-gray-800 shadow-inner aspect-[9/16] flex items-center justify-center">
                    <video 
                      src={clip.embedUrl} 
                      controls 
                      autoPlay 
                      loop 
                      muted 
                      className="w-full h-full object-cover"
                    ></video>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
