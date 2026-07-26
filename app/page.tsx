"use client";
import React, { useState } from 'react';

export default function AuthPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulación de acceso directo instantáneo para ti
    setTimeout(() => {
      localStorage.setItem('clipstream_user', email);
      window.location.href = '/dashboard/create';
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#0B0F19] text-white flex flex-col items-center justify-start p-4 md:p-8">
      <div className="max-w-6xl w-full flex flex-col items-center space-y-8">
        
        <div className="w-full bg-[#161D2E] border border-gray-800 rounded-3xl overflow-hidden shadow-2xl p-4 flex justify-center items-center">
          <div className="w-full rounded-2xl bg-[#0B0F19] border border-gray-800 p-6 text-center text-purple-400 font-bold text-lg md:text-xl tracking-wide shadow-inner">
            🚀 ClipStream AI — Automatización Inteligente de Clips Virales
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 w-full items-start">
          
          <div className="md:col-span-2 space-y-4 pt-4">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
              ¡Maximiza tu Contenido!
            </h1>
            <p className="text-xl font-medium text-purple-400">
              La forma más inteligente de crear clips virales
            </p>
            <p className="text-gray-400 text-sm md:text-base leading-relaxed">
              ClipStream AI utiliza tecnología de vanguardia para analizar tus vídeos largos, extraer automáticamente los momentos más impactantes y convertirlos en clips cortos y dinámicos para redes sociales. Con subtítulos automáticos y formatos adaptables, ahorra horas de edición y aumenta tu alcance orgánico.
            </p>
          </div>

          <div className="bg-[#161D2E] border border-gray-800 rounded-3xl p-6 shadow-xl w-full">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-purple-600 rounded-xl flex items-center justify-center font-bold text-xl shadow-lg">
                🎥
              </div>
              <div>
                <h2 className="text-xl font-bold">ClipStream AI</h2>
                <p className="text-xs text-gray-400">Te damos la bienvenida</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs text-gray-400 mb-1">Correo Electrónico</label>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tu@correo.com" 
                  required
                  className="w-full p-3 rounded-xl bg-[#0B0F19] border border-gray-700 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-purple-500"
                />
              </div>

              <div>
                <label className="block text-xs text-gray-400 mb-1">Contraseña</label>
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••" 
                  required
                  className="w-full p-3 rounded-xl bg-[#0B0F19] border border-gray-700 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-purple-500"
                />
              </div>

              <button 
                type="submit" 
                disabled={loading}
                className="w-full py-3 px-4 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold rounded-xl text-sm transition shadow-lg disabled:opacity-50"
              >
                {loading ? 'Entrando al sistema...' : 'Ingresar a mi cuenta'}
              </button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
}
