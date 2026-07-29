'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function CreatePage() {
  const [contentType, setContentType] = useState('text');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [isVideo, setIsVideo] = useState(false);
  const [credits, setCredits] = useState(79);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    setLoading(true);
    setResult(null);
    setIsVideo(false);

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
        throw new Error(data.error || 'Error al procesar la solicitud');
      }

      setCredits(data.remainingCredits);
      const outputText = data.output || data.message || '';
      setResult(outputText);
      
      // Forzamos a que si el resultado contiene un enlace de video o termina en mp4, lo pinte como reproductor
      if (outputText.startsWith('http') || outputText.includes('.mp4') || outputText.includes('w3schools.com')) {
        setIsVideo(true);
      }
    } catch (error: any) {
      alert(`Fallo: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Botón de retorno al Menú / Inicio */}
      <div className="flex justify-between items-center mb-6">
        <Link 
          href="/dashboard" 
          className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-purple-400 border border-purple-500/50 rounded-lg font-semibold transition flex items-center gap-2 shadow"
        >
          ⬅️ Volver al Menú
        </Link>
        <div className="bg-purple-900 border border-purple-500 px-4 py-2 rounded-lg text-white font-semibold shadow">
          ⚡ Créditos: {credits}
        </div>
      </div>

      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-white">ClipStream AI - Generador de Videos</h1>
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
                className={`py-3 px-4 rounded-lg font-medium border transition ${
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
          placeholder="Ej: Niños jugando en la escuela de forma alegre..."
          className="w-full h-32 p-3 border rounded-lg bg-gray-900 text-white focus:outline-none focus:border-purple-500"
          rows={4}
        />
        
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-lg transition disabled:opacity-50 shadow-lg"
        >
          {loading ? '🎬 Generando video con IA...' : '🚀 Generar Video (-1 Crédito)'}
        </button>
      </form>

      {result && (
        <div className="mt-8 p-6 bg-gray-800 border border-purple-500 rounded-lg text-white shadow-lg">
          <h3 className="text-lg font-semibold text-purple-400 mb-4">✨ Resultado de tu Video:</h3>
          
          {isVideo ? (
            <div className="space-y-4 text-center">
              <video 
                src={result} 
                controls 
                autoPlay 
                className="w-full max-h-[450px] rounded-lg border border-gray-700 mx-auto bg-black shadow"
              />
              <a 
                href={result} 
                download="video_generado.mp4" 
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg transition shadow"
              >
                📥 Descargar Video MP4
              </a>
            </div>
          ) : (
            <div className="whitespace-pre-wrap bg-gray-900 p-4 rounded border border-gray-700 text-gray-200">
              {result}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
