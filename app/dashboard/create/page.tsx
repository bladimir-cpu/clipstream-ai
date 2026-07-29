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
  const [generatedClips, setGeneratedClips] = useState<Array<{ id: number; title: string; duration: string; prompt: string; videoUrl: string }>>([]);

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
      // 🔗 Webhook oficial de Make integrado correctamente
      const MAKE_WEBHOOK_URL = "https://hook.us2.make.com/riejq03y1m8hgx4pjvzs6dhxvtskkr";

      const response = await fetch(MAKE_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: queryPrompt,
          type: activeTab,
          timestamp: new Date().toISOString()
        })
      });

      let data = null;
      try {
        data = await response.json();
      } catch (err) {
        data = null;
      }

      const shortPrompt = queryPrompt.length > 30 ? queryPrompt.slice(0, 30) + '...' : queryPrompt;
      
      setGeneratedClips([
        { 
          id: 1, 
          title: `Hook_Viral_Make`, 
          duration: '35s', 
          prompt: shortPrompt, 
          videoUrl: data?.videoUrl || 'https://www.w3schools.com/html/mov_bbb.mp4' 
        }
      ]);

      setGenerated(true);
      const newCredits = credits - 1;
      setCredits(newCredits);

      const sessionStr = localStorage.getItem('clipstream_session');
      if (sessionStr) {
        const session = JSON.parse(sessionStr);
        session.credits = newCredits;
        localStorage.setItem('clipstream_session', JSON.stringify(session));
      }

    } catch (error) {
      console.error("Error al conectar con Make:", error);
      alert("No se pudo conectar con el Webhook de Make. Revisa la consola.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('clipstream_session');
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-[#0B0F19] text-white p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Menú Superior */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-[#161D2E] border border-gray-800 p-4 rounded-2xl shadow-xl">
          <div className="flex items-center gap-4 text-xs md:text-sm font-medium">
            <a href="/" className="text-gray-400 hover:text-purple-400 transition">← Inicio</a>
            <span className="text-gray-700">|</span>
            <span className="text-purple-400 font-semibold">🎬 Estudio ClipStream AI</span>
          </div>
          <div className="text-xs bg-purple-600/20 border border-purple-500/30 px-3 py-1.5 rounded-xl font-medium text-purple-300">
            ⚡ Créditos: <strong className="text-white">{credits}</strong>
          </div>
        </div>

        <div className="bg-[#161D2E] border border-gray-800 rounded-3xl p-6 shadow-2xl space-y-6">
          <h2 className="text-2xl font-bold">Generador Conectado a Make.com</h2>

          <form onSubmit={handleGenerate} className="space-y-4">
            <div>
              <label className="block text-xs text-gray-400 mb-1">Escribe tu idea o prompt para enviar a Make</label>
              <textarea 
                rows={4}
                value={textContent}
                onChange={(e) => setTextContent(e.target.value)}
                placeholder="Ej: Generame un video de niños jugando..."
                className="w-full p-3.5 rounded-xl bg-[#0B0F19] border border-gray-700 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-purple-500"
              />
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full py-4 px-4 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 text-white font-bold rounded-xl text-base transition shadow-xl disabled:opacity-50 cursor-pointer"
            >
              {loading ? '🌐 Enviando datos a Make...' : '🚀 Enviar a Make y Generar (-1 Crédito)'}
            </button>
          </form>

          {generated && (
            <div className="mt-8 space-y-6 pt-4 border-t border-gray-800">
              <h3 className="text-lg font-bold text-purple-400">🎉 ¡Solicitud procesada por Make!</h3>
              
              {generatedClips.map((clip) => (
                <div key={clip.id} className="bg-[#0B0F19] border border-gray-800 p-5 rounded-2xl space-y-4">
                  <div>
                    <h4 className="font-semibold text-base text-white">{clip.title}</h4>
                    <p className="text-xs text-gray-400 mt-1">Prompt: "{clip.prompt}"</p>
                  </div>
                  <div className="w-full max-w-xs mx-auto bg-black rounded-xl overflow-hidden border border-gray-800 shadow-inner">
                    <video src={clip.videoUrl} controls preload="auto" playsInline className="w-full h-auto max-h-48 object-cover" />
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
