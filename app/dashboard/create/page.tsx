'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function CreatePage() {
  const [contentType, setContentType] = useState('text');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [credits, setCredits] = useState(100);

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
      setResult(data.output || data.message || 'Procesado con éxito');
    } catch (error: any) {
      alert('No se pudo conectar con el Webhook de Make. Asegúrate de que el escenario esté activo y dale a "Run once" en Make.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Menú de Navegación Superior */}
      <nav className="bg-gray-900 border-b border-purple-500/30 px-6 py-4 flex flex-wrap justify-between items-center gap-4 shadow-md">
        <div className="flex items-center gap-3">
          <span className="text-xl font-black text-purple-400">⚡ ClipStream AI</span>
        </div>
        <div className="flex items-center gap-6 font-medium text-sm">
          <Link href="/dashboard" className="hover:text-purple-400 transition">🏠 Inicio</Link>
          <Link href="/dashboard/create" className="text-purple-400 font-bold">🎬 Crear</Link>
          <Link href="/dashboard/planes" className="hover:text-purple-400 transition">💎 Planes</Link>
          <Link href="/dashboard/creditos" className="hover:text-purple-400 transition">💳 Comprar Créditos</Link>
        </div>
        <div className="bg-purple-900/80 border border-purple-500 px-4 py-1.5 rounded-lg text-sm font-bold shadow">
          ⚡ Créditos: {credits}
        </div>
      </nav>

      {/* Contenido Principal */}
      <div className="max-w-4xl mx-auto p-6 mt-6">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-white">Estudio ClipStream - Generador con IA</h1>
          <p className="text-gray-400 text-sm mt-1">Selecciona tu formato, escribe tu idea y conéctala con Make.</p>
        </div>
        
        <form onSubmit/handleSubmit className="space-y-6" onSubmit={handleSubmit}>
          {/* Selector de las 4 opciones */}
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
            placeholder="Escribe tu idea, enlace o prompt aquí..."
            className="w-full h-32 p-3 border rounded-lg bg-gray-900 text-white focus:outline-none focus:border-purple-500"
            rows={4}
          />
          
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-lg transition disabled:opacity-50 shadow-lg"
          >
            {loading ? '⏳ Conectando con Make...' : '🚀 Generar Contenido (-1 Crédito)'}
          </button>
        </form>

        {result && (
          <div className="mt-8 p-6 bg-gray-900 border border-purple-500 rounded-lg text-white shadow-xl">
            <h3 className="text-lg font-semibold text-purple-400 mb-4">✨ Resultado de Make:</h3>
            <div className="whitespace-pre-wrap bg-gray-950 p-4 rounded border border-gray-800 text-gray-200">
              {result}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
