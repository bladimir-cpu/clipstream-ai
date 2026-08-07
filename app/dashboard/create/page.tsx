'use client';

import { useState, useEffect } from 'react';

// Definimos el tipo para los resultados
type ClipResult = { id: number; title: string; url: string };

export default function DashboardCreatePage() {
  const [userEmail, setUserEmail] = useState('');
  const [credits, setCredits] = useState<number>(10);
  const [activeTab, setActiveTab] = useState<'video' | 'text' | 'image' | 'prompt'>('video');
  const [inputData, setInputData] = useState('');
  const [processing, setProcessing] = useState(false);
  const [results, setResults] = useState<ClipResult[]>([]); // Estado nuevo para los clips

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const email = localStorage.getItem('clipstream_user_email');
      if (email) {
        setUserEmail(email);
        const savedCredits = localStorage.getItem(`clipstream_credits_${email}`);
        setCredits(savedCredits !== null ? Number(savedCredits) : 10);
      }
    }
  }, []);

  const handleProcess = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputData && activeTab !== 'video') {
      alert('Por favor ingresa la información requerida.');
      return;
    }
    if (credits <= 0) {
      alert('Créditos insuficientes.');
      return;
    }

    setProcessing(true);
    setResults([]); // Limpiamos resultados anteriores

    setTimeout(() => {
      setProcessing(false);
      const newCredits = credits - 1;
      setCredits(newCredits);
      localStorage.setItem(`clipstream_credits_${userEmail}`, newCredits.toString());
      
      // Simulación de los 3 clips recuperados
      setResults([
        { id: 1, title: 'Clip Corto Viral (9:16)', url: '#' },
        { id: 2, title: 'Clip Dinámico Extendido', url: '#' },
        { id: 3, title: 'Clip Formato Original', url: '#' }
      ]);
      
      alert(`¡Contenido procesado! Te quedan ${newCredits} créditos.`);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* Header (Mismo de antes) */}
      <header className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div className="flex justify-between items-center bg-slate-900/60 p-4 rounded-2xl border border-slate-800 backdrop-blur-md">
           <div className="flex items-center gap-2">🚀 <span className="font-extrabold text-white">ClipStream AI Studio</span></div>
           <span className="text-xs text-amber-400 font-bold">⚡ Créditos: {credits}</span>
        </div>
      </header>

      <main className="flex-1 max-w-5xl w-full mx-auto px-4 py-12">
        {/* Formulario (Mismo de antes) */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-8 mb-12">
          <form onSubmit={handleProcess} className="space-y-4">
             {/* ... (Todo tu formulario igual) ... */}
             <button type="submit" disabled={processing} className="w-full bg-gradient-to-r from-purple-600 to-blue-600 py-4 rounded-xl font-bold">
               {processing ? 'Procesando...' : '⚡ Generar Contenido'}
             </button>
          </form>
        </div>

        {/* SECCIÓN NUEVA: Resultados */}
        {results.length > 0 && (
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-6 animate-in fade-in zoom-in duration-500">
            {results.map((clip) => (
              <div key={clip.id} className="bg-slate-900 border border-slate-700 p-6 rounded-2xl text-center space-y-4">
                <div className="text-4xl">🎥</div>
                <h3 className="text-sm font-bold text-white">{clip.title}</h3>
                <a href={clip.url} className="block w-full bg-slate-800 hover:bg-purple-600 py-2 rounded-lg text-xs font-bold transition">
                  📥 Descargar Clip
                </a>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
