"use client";
import React, { useState } from 'react';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (isLogin) {
      console.log('Iniciando sesión con:', email);
      // Aquí va tu código de Supabase: supabase.auth.signInWithPassword(...)
    } else {
      console.log('Creando cuenta con:', email);
      // Aquí va tu código de Supabase: supabase.auth.signUp(...)
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0F19] flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-[#1A1F2E] rounded-2xl shadow-2xl p-8 border border-gray-800">
        
        {/* Logo / Cabecera */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-violet-600 to-blue-600 rounded-xl mx-auto flex items-center justify-center mb-4 shadow-lg shadow-violet-500/30">
            <span className="text-3xl">🎬</span>
          </div>
          <h2 className="text-3xl font-extrabold text-white mb-2">
            ClipStream <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-blue-400">AI</span>
          </h2>
          <p className="text-gray-400">
            {isLogin ? 'Te damos la bienvenida de nuevo' : 'Crea tu cuenta para empezar'}
          </p>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Correo Electrónico
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-[#0B0F19] border border-gray-700 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent text-white placeholder-gray-500 transition-colors"
              placeholder="tu@correo.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Contraseña
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-[#0B0F19] border border-gray-700 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent text-white placeholder-gray-500 transition-colors"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-500 hover:to-blue-500 text-white font-bold rounded-lg shadow-lg transform transition-all hover:scale-[1.02] active:scale-95"
          >
            {isLogin ? 'Ingresar a mi cuenta' : 'Registrarme ahora'}
          </button>
        </form>

        {/* Alternador de Vistas */}
        <div className="mt-6 text-center">
          <p className="text-gray-400 text-sm">
            {isLogin ? '¿Aún no tienes acceso?' : '¿Ya tienes una cuenta?'}
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="ml-2 text-violet-400 hover:text-violet-300 font-semibold transition-colors"
            >
              {isLogin ? 'Crear cuenta' : 'Iniciar sesión'}
            </button>
          </p>
        </div>
        
      </div>
    </div>
  );
}
