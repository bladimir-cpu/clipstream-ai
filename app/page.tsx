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
    <div className="min-h-screen bg-[#0B0F19] flex items-center justify-center p-4 md:p-10 text-white font-sans">
      <div className="max-w-7xl w-full grid md:grid-cols-[1.5fr,1fr] gap-12 items-center">
        
        {/* PANEL IZQUIERDO: Descripciones e Ilustración */}
        <div className="flex flex-col space-y-8 text-center md:text-left">
          
          {/* Marcador de posición para la ilustración del editor */}
          <div className="aspect-[16/10] bg-[#1A1F2E] rounded-2xl border border-gray-800 flex flex-col items-center justify-center p-6 shadow-2xl mb-8 group hover:border-violet-500/50 transition-colors">
            <span className="text-gray-500 text-lg">
              [Espacio para la ilustración aprobada (p.ej. de image_7.png)]
            </span>
            <p className="text-gray-600 text-sm mt-2">
              (Aquí deberás subir el archivo de imagen de la ilustración)
            </p>
            {/* Si tienes la imagen lista, borra las dos líneas de arriba y pon esto:
            <img src="/ruta/a/tu/imagen.png" alt="ClipStream AI Editor" className="w-full h-full object-contain" />
            */}
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

        {/* PANEL DERECHO: Formulario de Login/Registro */}
        <div className="flex justify-center md:justify-end">
          <div className="max-w-md w-full bg-[#1A1F2E] rounded-2xl shadow-2xl p-10 border border-gray-800">
            
            {/* Logo / Cabecera */}
            <div className="text-center mb-10">
              <div className="w-20 h-20 bg-gradient-to-br from-violet-600 to-blue-600 rounded-2xl mx-auto flex items-center justify-center mb-6 shadow-xl shadow-violet-500/30 transition-transform group-hover:scale-105">
                <span className="text-4xl">🎬</span>
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
                  className="w-full px-4 py-3.5 bg-[#0B0F19] border border-gray-700 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-transparent text-white placeholder-gray-500 transition-colors"
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
                  className="w-full px-4 py-3.5 bg-[#0B0F19] border border-gray-700 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-transparent text-white placeholder-gray-500 transition-colors"
                  placeholder="••••••••"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 px-6 bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-500 hover:to-blue-500 text-white font-bold rounded-xl shadow-lg transform transition-all hover:scale-[1.02] active:scale-95"
              >
                {isLogin ? 'Ingresar a mi cuenta' : 'Registrarme ahora'}
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
