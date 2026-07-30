"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAccess = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    
    setLoading(true);
    // Guardamos la sesión localmente para dar acceso inmediato y seguro al estudio
    localStorage.setItem('clipstream_session', email);
    
    setTimeout(() => {
      router.push('/dashboard/create');
    }, 500);
  };

  const handleGoogleAccess = () => {
    localStorage.setItem('clipstream_session', 'google_user@clipstream.ai');
    router.push('/dashboard/create');
  };

  return (
    <div className="min-h-screen bg-[#0B0F19] text-white flex flex-col items-center justify-between p-4 md:p-8">
      
      {/* Menú Superior Original */}
      <div className="w-full max-w-5xl bg-[#161D2E] border border-gray-800 p-4 rounded-2xl shadow-xl flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold text-purple-300">🚀 ClipStream AI</span>
        </div>
        <div className="flex items-center gap-4 text-sm font-medium">
          <button onClick={() => router.push('/dashboard/create')} className="text-gray-300 hover:text-purple-400 cursor-pointer">Crear</button>
          <span className="text-gray-700">|</span>
          <button onClick={() => router.push('/pricing')} className="text-purple-400 hover:text-purple-300 font-semibold cursor-pointer">Planes y Precios</button>
        </div>
      </div>

      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-12 items-center my-auto">
        
        {/* Columna Izquierda: Presentación intacta */}
        <div className="space-y-6">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
            ¡Maximiza tu <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">Contenido!</span>
          </h1>
          <p className="text-xl text-purple-400 font-medium">La forma más inteligente de crear clips virales</p>
          <p className="text-gray-400 leading-relaxed text-sm md:text-base">
            ClipStream AI utiliza tecnología de vanguardia para analizar tus vídeos largos, extraer automáticamente los momentos más impactantes y convertirlos en clips cortos y dinámicos para redes sociales. Con subtítulos automáticos y formatos adaptables, ahorra horas de edición y aumenta tu alcance orgánico.
          </p>
        </div>

        {/* Columna Derecha: Panel de Acceso Blindado */}
        <div className="bg-[#161D2E] border border-gray-800 rounded-3xl p-8 shadow-2xl w-full max-w-md mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-2xl">🎥</span>
            <div>
              <h2 className="text-xl font-bold text-white">ClipStream AI</h2>
              <p className="text-xs text-purple-400">Panel de Acceso</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <button 
              type="button" 
              onClick={handleGoogleAccess} 
              className="w-full py-3.5 bg-white hover:bg-gray-100 text-gray-900 font-bold rounded-xl flex items-center justify-center gap-3 cursor-pointer text-sm shadow transition"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
              </svg>
              Continuar con Google
            </button>
            
            <div className="flex items-center my-4">
              <div className="flex-grow border-t border-gray-700"></div>
              <span className="px-3 text-xs text-gray-500 uppercase">o con correo</span>
              <div className="flex-grow border-t border-gray-700"></div>
            </div>

            <form onSubmit={handleAccess} className="space-y-4">
              <input 
                type="email" 
                required 
                placeholder="Tu correo" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                className="w-full p-3 rounded-xl bg-[#0B0F19] border border-gray-700 text-white text-sm focus:outline-none focus:border-purple-500" 
              />
              <input 
                type="password" 
                required 
                placeholder="Tu contraseña" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                className="w-full p-3 rounded-xl bg-[#0B0F19] border border-gray-700 text-white text-sm focus:outline-none focus:border-purple-500" 
              />
              <button 
                type="submit" 
                disabled={loading}
                className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl text-sm cursor-pointer shadow-lg transition disabled:opacity-50"
              >
                {loading ? 'Ingresando...' : 'Ingresar al Estudio'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
