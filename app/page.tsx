"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function HomePage() {
  const router = useRouter();
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) setIsLoggedIn(true);
    });
  }, []);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLoginMode) {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) {
          alert("Correo o contraseña incorrectos");
        } else {
          router.push('/dashboard/create');
        }
      } else {
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) {
          alert(error.message);
        } else {
          alert("¡Registro exitoso! Ya puedes iniciar sesión.");
          setIsLoginMode(true);
        }
      }
    } catch (err) {
      alert("Error de conexión con el servidor.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${window.location.origin}/dashboard/create` },
    });
  };

  return (
    <div className="min-h-screen bg-[#0B0F19] text-white flex flex-col items-center justify-between p-4 md:p-8">
      
      {/* Menú Superior */}
      <div className="w-full max-w-5xl bg-[#161D2E] border border-gray-800 p-4 rounded-2xl shadow-xl flex justify-between items-center mb-6">
        <span className="text-sm font-bold text-purple-300">🚀 ClipStream AI</span>
        <button onClick={() => router.push('/pricing')} className="text-purple-400 font-semibold text-sm cursor-pointer hover:underline">💎 Planes y Precios</button>
      </div>

      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-12 items-center my-auto">
        
        {/* Columna Izquierda con tus textos originales */}
        <div className="space-y-6">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
            ¡Maximiza tu <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">Contenido!</span>
          </h1>
          <p className="text-xl text-purple-400 font-medium">La forma más inteligente de crear clips virales</p>
          <p className="text-gray-400 leading-relaxed text-sm md:text-base">
            ClipStream AI utiliza tecnología de vanguardia para analizar tus vídeos largos, extraer automáticamente los momentos más impactantes y convertirlos en clips cortos y dinámicos para redes sociales.
          </p>
        </div>

        {/* Columna Derecha: Panel de Acceso */}
        <div className="bg-[#161D2E] border border-gray-800 rounded-3xl p-8 shadow-2xl w-full max-w-md mx-auto">
          <h2 className="text-xl font-bold text-white mb-6">Panel de Acceso</h2>
          
          {isLoggedIn ? (
            <div className="text-center space-y-4">
              <p className="text-green-400 font-bold">¡Sesión Activa!</p>
              <button onClick={() => router.push('/dashboard/create')} className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl cursor-pointer">Entrar al Estudio</button>
            </div>
          ) : (
            <div className="space-y-4">
              <button onClick={handleGoogleLogin} className="w-full py-3.5 bg-white hover:bg-gray-100 text-gray-900 font-bold rounded-xl flex items-center justify-center gap-3 cursor-pointer text-sm shadow">
                Continuar con Google
              </button>
              
              <div className="flex items-center my-4">
                <div className="flex-grow border-t border-gray-700"></div>
                <span className="px-3 text-xs text-gray-500 uppercase">o con correo</span>
                <div className="flex-grow border-t border-gray-700"></div>
              </div>

              <form onSubmit={handleAuth} className="space-y-4">
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
                  className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl text-sm cursor-pointer disabled:opacity-50"
                >
                  {loading ? 'Procesando...' : (isLoginMode ? 'Ingresar' : 'Crear Cuenta')}
                </button>
                <button 
                  type="button" 
                  onClick={() => setIsLoginMode(!isLoginMode)} 
                  className="w-full text-xs text-gray-400 hover:text-purple-400 mt-2 cursor-pointer"
                >
                  {isLoginMode ? '¿No tienes cuenta? Regístrate' : '¿Ya tienes cuenta? Ingresa'}
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
