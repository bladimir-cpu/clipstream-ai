'tsx'
'use client';

import { useState } from 'react';

export default function CreatePage() {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [credits, setCredits] = useState(80); // O el estado de créditos que manejes

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
          type: 'text',
          content: content,
          userCredits: credits,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Error al procesar la solicitud');
      }

      // Actualizamos créditos restantes y mostramos el resultado real
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
      <h1 className="text-2xl font-bold mb-4">Generador Conectado - ClipStream AI</h1>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Ej: Generame un video motivacional sobre emprendimiento..."
          className="w-full h-32 p-3 border rounded-lg bg-gray-900 text-white"
          rows={4}
        />
        
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-lg transition"
        >
          {loading ? 'Generando contenido con IA...' : '🚀 Generar y Mostrar Resultado (-1 Crédito)'}
        </button>
      </form>

      {/* Caja donde el cliente ve el resultado final */}
      {result && (
        <div className="mt-8 p-6 bg-gray-800 border border-purple-500 rounded-lg text-white">
          <h3 className="text-lg font-semibold text-purple-400 mb-2">✨ Resultado Generado:</h3>
          <div className="whitespace-pre-wrap bg-gray-900 p-4 rounded border border-gray-700">
            {result}
          </div>
        </div>
      )}
    </div>
  );
}
