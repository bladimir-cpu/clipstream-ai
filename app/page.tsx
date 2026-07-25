"use client";
import React, { useState } from 'react';
import { createClient } from '@supabase/supabase-js';

// Inicializamos Supabase usando las variables de entorno públicas que ya tienes en tu proyecto
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      if (isLogin) {
        // --- INICIAR SESIÓN ---
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) throw error;

        setSuccessMessage('¡Inicio de sesión exitoso! Redirigiendo...');
        setTimeout(() => {
          window.location.href = '/dashboard/create';
        }, 1200);

      } else {
        // --- CREAR CUENTA ---
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
        });

        if (error) throw error;

        setSuccessMessage('¡Cuenta creada con éxito! Ya puedes iniciar sesión.');
        setIsLogin(true); // Cambiamos a la vista de login para que ingrese
      }
    } catch (error: any) {
      setErrorMessage(error.message || 'Ocurrió un error inesperado. Inténtalo de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0F19] flex items-center justify-center p-4 md:p-10 text-white font-sans">
      <div className="max-w-7xl w-full grid md:grid-cols-[1.5fr,1fr] gap-12 items-center">
        
        {/* PANEL IZQUIERDO: Descripciones e Ilustración */}
        <div className="flex flex-col space-y-8 text-center md:text-left">
          
          <div className="aspect-[16/10] bg-[#1A1F2E] rounded-2xl border border-gray-800 flex flex-col items-center justify-center p-6 shadow-2xl mb-8 group hover:border-violet-500/50 transition-colors relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-tr from-violet-600/10 to-blue-600/15 pointer-events-none"></div>
            <div className="text-center z-10 space-y-3">
              <span className="text-5xl">🎬✨</span>
              <h3 className="text-xl font-bold text-violet-300">ClipStream AI Editor</h3>
              <p className="text-gray-400 text-sm max-w-md mx-auto">
                Tu estudio automatizado de edición vertical con Inteligencia Artificial.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
              ¡Maximiza tu Contenido!
            </h1>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-300">
              La forma más inteligente de crear clips virales
            </h2>
          </div>

          <p className="text-gray-400 text-lg max-w-3xl leading-relaxed">
            ClipStream AI utiliza tecnología de vanguardia para analizar tus vídeos largos, extraer automáticamente los momentos más impactantes y convertirlos en clips cortos y dinámicos para redes sociales. Con subtítulos automáticos y formatos adaptables, ahorra horas de edición y aumenta tu alcance orgánico.
          </p>
        </div>

        {/* PANEL DERECHO: Formulario de Login/Registro conectado */}
        <div className="flex justify-center md:justify-end">
          <div className="max-w-md w-full bg-[#1A1F2E] rounded-2xl shadow-2xl p-10 border border-gray-800">
            
            {/* Logo / Cabecera */}
            <div className="text-center mb-10">
              <div className="w-20 h-20 bg-gradient-to-br from-violet-600 to-blue-600 rounded-2xl mx-auto flex items-center justify-center mb-6 shadow-xl shadow-violet-500/30">
                <span className="text-4xl">🎬</span>
              </div>
              <h2 className="text-3xl font-extrabold text-white mb-2">
                ClipStream <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-blue-400">AI</span>
              </h2>
              <p className="text-gray-400">
                {isLogin ? 'Te damos la bienvenida de nuevo' : 'Crea tu cuenta para empezar'}
              </p>
            </div>

            {/* Mensajes de Alerta */}
            {errorMessage && (
              <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-sm text-center">
                {errorMessage}
              </div>
            )}
            {successMessage && (
              <div className="mb-6 p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-400 text-sm text-center">
                {successMessage}
              </div>
            )}

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
                  className="w-full px-4 py-3.5 bg-[#0B0F19] border border-gray-700 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-transparent text-white placeholder-gray-500 transition-colors"
                  placeholder="tu@correo.com"
                />
              </div>

              {/* Campo de Contraseña con el Botón del Ojito */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Contraseña
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3.5 bg-[#0B0F19] border border-gray-700 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-transparent text-white placeholder-gray-500 transition-colors pr-12"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors focus:outline-none p-1"
                    title={showPassword ? "Ocultar contraseña" : "Ver contraseña"}
                  >
                    {showPassword ? (
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.243 4.243L9.88 9.88" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 px-6 bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-500 hover:to-blue-500 text-white font-bold rounded-xl shadow-lg transform transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Procesando...' : (isLogin ? 'Ingresar a mi cuenta' : 'Registrarme ahora')}
              </button>
            </form>

            {/* Alternador de Vistas */}
            <div className="mt-8 text-center border-t border-gray-800 pt-6">
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
        
      </div>
    </div>
  );
}
