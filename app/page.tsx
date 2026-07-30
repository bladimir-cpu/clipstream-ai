"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  "https://xcceqbmjjumhhucqjfp.supabase.co", 
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhjY2VxYm1qanVtaGh1Y3FqZnAiLCJyb2xlIjoiYW5vbiIsImlhdCI6MTcyODA5OTYyMywiZXhwIjoyMDQzNjc1NjIzfQ.GvV8k-J-U5G3..."
);

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
    setLoading(false);
  };

  const handleGoogleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${window.location.origin}/dashboard/create` },
    });
  };

  return (
    <div className="min-h-screen bg-[#0B0F19] text-white flex flex-col items-center justify-between p-4 md:p-8">
      <div className="w-full max-w-5xl bg-[#161D2E] border border-gray-800 p-4 rounded-2xl shadow-xl flex justify-between items-center mb-6">
        <span className="text-sm font-bold text-purple-300">🚀 ClipStream AI</span>
        <button onClick={() => router.push('/pricing')} className="text-purple-400 font-semibold text-sm">💎 Planes y Precios</button>
      </div>

      <div className="w-full max-w-md bg-[#161D2E] border border-gray-800 rounded-3xl p-8 shadow-2xl my-auto">
        <h2 className="text-xl font-bold text-white mb-6">Panel de Acceso</h2>
        
        {isLoggedIn ? (
          <div className="text-center space-y-4">
            <p className="text-green-400 font-bold">¡Sesión Activa!</p>
            <button onClick={() => router.push('/dashboard/create')} className="w-full py-3 bg-purple-600 text-white font-bold rounded-xl">Entrar al Estudio</button>
          </div>
        ) : (
          <div className="space-y-4">
            <button onClick={handleGoogleLogin} className="w-full py-3.5 bg-white text-gray-900 font-bold rounded-xl flex items-center justify-center gap-3">
              Continuar con Google
            </button>
            <div className="text-center text-xs text-gray-500 uppercase my-2">o con correo</div>
            <form onSubmit={handleAuth} className="space-y-4">
              <input type="email" required placeholder="Tu correo" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-3 rounded-xl bg-[#0B0F19] border border-gray-700 text-white" />
              <input type="password" required placeholder="Tu contraseña" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-3 rounded-xl bg-[#0B0F19] border border-gray-700 text-white" />
              <button type="submit" disabled={loading} className="w-full py-3 bg-purple-600 text-white font-bold rounded-xl">
                {loading ? 'Procesando...' : (isLoginMode ? 'Ingresar' : 'Crear Cuenta')}
              </button>
              <button type="button" onClick={() => setIsLoginMode(!isLoginMode)} className="w-full text-xs text-gray-400 mt-2">
                {isLoginMode ? '¿No tienes cuenta? Regístrate' : '¿Ya tienes cuenta? Ingresa'}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
