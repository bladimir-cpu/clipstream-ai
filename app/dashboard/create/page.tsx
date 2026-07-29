'use client';

import { useState } from 'react';

export default function CreatePage() {
  const [inputType, setInputType] = useState('text'); // text, image, youtube, prompt
  const [content, setContent] = useState('');
  const [userCredits, setUserCredits] = useState(81);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) {
      alert('Por favor completa el campo de contenido.');
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: inputType,
          content: content,
          userCredits: userCredits,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'No se pudo conectar con el Webhook de Make. Revisa la consola.');
      }

      setUserCredits(data.remainingCredits);
      setMessage(data.message);
      setContent('');
      alert('¡Enviado a Make con éxito!');
    } catch (err: any) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0F19] text-white p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Cabecera con Créditos */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-[#161D2E] border border-gray-800 rounded-3xl p-6 shadow-2xl">
          <div>
            <h2 className="text-2xl font-bold">Generador Conectado a Make.com</h2>
            <p className="text-gray-400 text-sm mt-1">Selecciona el formato de entrada y envía tus datos al escenario.</p>
          </div>
          <div className="bg-[#0B0F19] border border-purple-500/30 px-4 py-2 rounded-2xl flex items-center gap-2">
            <span className="text-purple-400 font-semibold">⚡ Créditos:</span>
            <span className="text-lg font-bold">{userCredits}</span>
          </div>
        </div>

        {/* Formulario Principal */}
        <div className="bg-[#161D2E] border border-gray-800 rounded-3xl p-6 shadow-2xl space-y-6">
          
          {/* Selector de las 4 opciones */}
          <div>
            <label className="block text-xs text-gray-400 mb-2">Selecciona el tipo de entrada</label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <button
                type="button"
                onClick={() => setInputType('text')}
                className={`py-3 px-4 rounded-xl text-sm font-medium transition-all ${
                  inputType === 'text'
                    ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30'
                    : 'bg-[#0B0F19] text-gray-400 border border-gray-800 hover:border-gray-700'
                }`}
              >
                📝 Texto / Idea
              </button>
              <button
                type="button"
                onClick={() => setInputType('youtube')}
                className={`py-3 px-4 rounded-xl text-sm font-medium transition-all ${
                  inputType === 'youtube'
                    ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30'
                    : 'bg-[#0B0F19] text-gray-400 border border-gray-800 hover:border-gray-700'
                }`}
              >
                📺 URL de YouTube
              </button>
              <button
                type="button"
                onClick={() => setInputType('image')}
                className={`py-3 px-4 rounded-xl text-sm font-medium transition-all ${
                  inputType === 'image'
                    ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30'
                    : 'bg-[#0B0F19] text-gray-400 border border-gray-800 hover:border-gray-700'
                }`}
              >
                🖼️ Imagen (URL)
              </button>
              <button
                type="button"
                onClick={() => setInputType('prompt')}
                className={`py-3 px-4 rounded-xl text-sm font-medium transition-all ${
                  inputType === 'prompt'
                    ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30'
                    : 'bg-[#0B0F19] text-gray-400 border border-gray-800 hover:border-gray-700'
                }`}
              >
                ✨ Prompt IA
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs text-gray-400 mb-1">
                {inputType === 'youtube' && 'Pega la URL del video de YouTube:'}
                {inputType === 'image' && 'Pega la URL de la imagen:'}
                {inputType === 'text' && 'Escribe tu idea o concepto:'}
                {inputType === 'prompt' && 'Escribe el prompt detallado para la IA:'}
              </label>
              <textarea
                rows={4}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder={
                  inputType === 'youtube'
                    ? 'Ej: https://www.youtube.com/watch?v=...'
                    : inputType === 'image'
                    ? 'Ej: https://tuservidor.com/imagen.jpg'
                    : 'Ej: Generame un video motivacional sobre emprendimiento...'
                }
                className="w-full p-3.5 rounded-xl bg-[#0B0F19] border border-gray-700 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-purple-500"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 px-4 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 rounded-xl text-base font-semibold transition shadow-xl disabled:opacity-50 cursor-pointer"
            >
              {loading ? '🚀 Enviando datos a Make...' : '🚀 Enviar a Make y Generar (-1 Crédito)'}
            </button>
          </form>

          {message && (
            <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-xl text-green-400 text-sm text-center">
              {message}
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
