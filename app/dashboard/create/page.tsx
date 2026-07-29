'use client';

import { useState } from 'react';

export default function CreatePage() {
  const [contentType, setContentType] = useState('text');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [credits, setCredits] = useState(80);

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
        throw new Error(data.error || 'Error al procesar la solicitud');
      }

      setCredits(data.remainingCredits);
      setResult(data.output || data.message || '¡Contenido generado con éxito!');
    } catch (error: any) {
      alert(`Fallo: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-white">Generador Conectado - ClipStream AI</h1>
        <div className="bg-purple-900 border border-purple-500 px-4 py-2 rounded-lg text-white font-semibold">
          ⚡ Créditos: {credits}
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Tus botones de selección originales */}
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
          placeholder="Ej: Generame un video motivacional sobre emprendimiento..."
          className="w-full h-32 p-3 border rounded-lg bg-gray-900 text-white focus:outline-none focus:border-purple-500"
          rows={4}
        />
        
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-lg transition disabled:opacity-50"
        >
          {loading ? 'Generando contenido con IA...' : '🚀 Enviar a Make y Generar (-1 Crédito)'}
        </button>
      </form>

      {result && (
        <div className="mt-8 p-6 bg-gray-800 border border-purple-500 rounded-lg text-white shadow-lg">
          <h3 className="text-lg font-semibold text-purple-400 mb-2">✨ Resultado Generado:</h3>
          <div className="whitespace-pre-wrap bg-gray-900 p-4 rounded border border-gray-700 text-gray-200">
            {result}
          </div>
        </div>
      )}
    </div>
  );
}
