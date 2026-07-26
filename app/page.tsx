"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Verifica si el usuario ya inició sesión para no pedirle los datos otra vez
  useEffect(() => {
    const session = localStorage.getItem('clipstream_session');
    if (session) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulamos el inicio de sesión o registro y le damos sus 100 créditos gratis iniciales
    localStorage.setItem('clipstream_session', JSON.stringify({ 
      email: email, 
      credits: 100,
      isPremium: false
    }));
    router.push('/dashboard/create');
  };

  const handleLogout = () => {
    localStorage.removeItem('clipstream_session');
    setIsLoggedIn(false);
  };

  return (
    <div className="min-h-screen bg-[#0B0F19] text-white flex flex-col items-center justify-between p-4 md:p-8">
      
      {/* Menú Superior de Navegación Profesional */}
      <div className="w-full max-w-5xl bg-[#161D2E] border border-gray-800 p-4 rounded-2xl shadow-xl flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
        <div className="flex items-center gap-2">
          <span className="text-xl">🚀</span>
          <span className="text-sm font-bold text-purple-300 tracking-wide">ClipStream AI</span>
        </div>
        
        <div className="flex items-center gap-4 text-xs md:text-sm font-medium">
          <button 
            onClick={() => router.push('/dashboard/create')}
            className="text-gray-300 hover:text-purple-400 transition cursor-pointer flex items-center gap-1"
          >
            🎬 Generar Videos
          </button>
          <span className="text-gray-700">|</span>
          <button 
            onClick={() => router.push('/pricing')}
            className="text-purple-400 hover:text-purple-300 transition cursor-pointer font-semibold flex items-center gap-1"
          >
            💎 Planes y Precios
          </button>
        </div>
      </div>

      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-12 items-center my-auto">
        
        {/* Columna Izquierda: Textos e Imagen Comercial Tecnológica */}
        <div className="space-y-6">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
            ¡Maximiza tu <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">Contenido!</span>
          </h1>
          <p className="text-xl text-purple-400 font-medium">La forma más inteligente de crear clips virales</p>
          <p className="text-gray-400 leading-relaxed text-sm md:text-base">
            ClipStream AI utiliza tecnología de vanguardia para analizar tus vídeos largos, extraer automáticamente los momentos más impactantes y convertirlos en clips cortos y dinámicos para redes sociales. Con subtítulos automáticos y formatos adaptables, ahorra horas de edición y aumenta tu alcance orgánico.
          </p>
          
          {/* Imagen de tecnología, computadoras y analítica de datos */}
          <div className="mt-8 rounded-2xl overflow-hidden border border-purple-500/30 shadow-2xl relative group">
            <img 
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop" 
              alt="Tecnología e Inteligencia Artificial ClipStream" 
              className="w-full h-auto opacity-80 group-hover:opacity-100 transition duration-500 rounded-xl"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F19] via-transparent to-transparent opacity-60"></div>
          </div>
        </div>

        {/* Columna Derecha: Panel de Autenticación */}
        <div className="bg-[#161D2E] border border-gray-800 rounded-3xl p-8 shadow-2xl w-full max-w-md mx-auto relative overflow-hidden">
          
          {/* Efecto de brillo de fondo */}
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>

          <div className="flex items-center gap-4 mb-8">
            <div className="bg-purple-600/20 p-3 rounded-xl border border-purple-500/30">
              <span className="text-2xl">🎥</span>
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">ClipStream AI</h2>
              <p className="text-xs text-purple-400 font-medium">Panel de Acceso</p>
            </div>
          </div>

          {isLoggedIn ? (
            <div className="space-y-6 text-center py-4">
              <div className="inline-block p-4 bg-green-500/10 border border-green-500/20 rounded-full mb-2">
                <span className="text-3xl">✅</span>
              </div>
              <h3 className="text-lg font-bold text-white">¡Ya estás dentro!</h3>
              <p className="text-sm text-gray-400">Tu sesión está activa y tienes 100 créditos gratis disponibles para usar hoy.</p>
              
              <button 
                onClick={() => router.push('/dashboard/create')}
                className="w-full py-3.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold rounded-xl text-sm transition shadow-lg cursor-pointer"
              >
                🚀 Continuar al Estudio
              </button>
              
              <button 
                onClick={handleLogout}
                className="text-xs text-gray-500 hover:text-white transition underline decoration-gray-700 underline-offset-4 mt-4 cursor-pointer"
              >
                Cerrar Sesión
              </button>
            </div>
          ) : (
            <form onSubmit={handleAuth} className="space-y-5 relative z-10">
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1.5">Correo Electrónico</label>
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tu@correo.com" 
                  className="w-full p-3.5 rounded-xl bg-[#0B0F19] border border-gray-700 text-white placeholder-gray-600 text-sm focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1.5">Contraseña</label>
                <div className="relative">
                  <input 
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••" 
                    className="w-full p-3.5 pr-12 rounded-xl bg-[#0B0F19] border border-gray-700 text-white placeholder-gray-600 text-sm focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition"
                  />
                  {/* Botón del ojito para la contraseña */}
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition p-1 cursor-pointer"
                  >
                    {showPassword ? (
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" /></svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                    )}
                  </button>
                </div>
              </div>

              <button 
                type="submit" 
                className="w-full py-3.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold rounded-xl text-sm transition shadow-lg mt-2 cursor-pointer"
              >
                {isLoginMode ? 'Ingresar al Estudio' : 'Crear Cuenta (100 Créditos Gratis)'}
              </button>

              <div className="text-center pt-2">
                <button 
                  type="button"
                  onClick={() => setIsLoginMode(!isLoginMode)}
                  className="text-xs text-gray-400 hover:text-purple-400 transition cursor-pointer"
                >
                  {isLoginMode 
                    ? '¿No tienes cuenta? Regístrate aquí' 
                    : '¿Ya tienes cuenta? Inicia sesión'}
                </button>
              </div>
            </form>
          )}

        </div>
      </div>

      <div className="w-full max-w-5xl text-center text-xs text-gray-500 pt-6 border-t border-gray-900 mt-6">
        ClipStream AI © 2026 — Todos los derechos reservados.
      </div>

    </div>
  );
}
