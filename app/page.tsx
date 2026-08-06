'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function LandingLoginPage() {
  const [view, setView] = useState<'login' | 'register' | 'forgot'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  // Estados para recuperación de contraseña con preguntas secretas
  const [secretQuestion, setSecretQuestion] = useState('¿Cuál es el nombre de tu primera mascota?');
  const [secretAnswer, setSecretAnswer] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!email || !email.includes('@')) {
      setErrorMessage('Ingresa un correo electrónico válido.');
      return;
    }
    if (!password || password.length < 6) {
      setErrorMessage('La contraseña debe tener al menos 6 caracteres.');
      return;
    }

    if (typeof window !== 'undefined') {
      const savedPass = localStorage.getItem(`clipstream_pass_${email}`);
      if (savedPass && savedPass !== password) {
        setErrorMessage('Contraseña incorrecta.');
        return;
      }
      
      // Si es nuevo usuario, le asignamos 10 créditos iniciales
      if (!localStorage.getItem(`clipstream_credits_${email}`)) {
        localStorage.setItem(`clipstream_credits_${email}`, '10');
      }

      localStorage.setItem('clipstream_user_email', email);
      window.location.href = '/dashboard/create';
    }
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!email || !email.includes('@')) {
      setErrorMessage('Ingresa un correo electrónico válido.');
      return;
    }
    if (!password || password.length < 6) {
      setErrorMessage('La contraseña debe tener al menos 6 caracteres.');
      return;
    }
    if (!secretAnswer) {
      setErrorMessage('Por favor responde la pregunta secreta para recuperar tu cuenta.');
      return;
    }

    if (typeof window !== 'undefined') {
      localStorage.setItem(`clipstream_pass_${email}`, password);
      localStorage.setItem(`clipstream_q_${email}`, secretQuestion);
      localStorage.setItem(`clipstream_a_${email}`, secretAnswer.toLowerCase().trim());
      localStorage.setItem(`clipstream_credits_${email}`, '10'); // 10 créditos gratis de bienvenida
      localStorage.setItem('clipstream_user_email', email);
      
      window.location.href = '/dashboard/create';
    }
  };

  const handleRecoverSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (!email || !email.includes('@')) {
      setErrorMessage('Ingresa tu correo para buscar la cuenta.');
      return;
    }

    const savedAnswer = localStorage.getItem(`clipstream_a_${email}`);
    if (!savedAnswer) {
      setErrorMessage('No existe un registro de preguntas secretas para este correo.');
      return;
    }

    if (secretAnswer.toLowerCase().trim() !== savedAnswer) {
      setErrorMessage('La respuesta secreta es incorrecta.');
      return;
    }

    if (!newPassword || newPassword.length < 6) {
      setErrorMessage('La nueva contraseña debe tener al menos 6 caracteres.');
      return;
    }

    localStorage.setItem(`clipstream_pass_${email}`, newPassword);
    setSuccessMessage('¡Contraseña restablecida con éxito! Ya puedes iniciar sesión.');
    setTimeout(() => {
      setView('login');
      setSuccessMessage('');
    }, 2000);
  };

  const handleGoogleLogin = () => {
    if (typeof window !== 'undefined') {
      const gEmail = 'distribuidoresencalada@gmail.com';
      if (!localStorage.getItem(`clipstream_credits_${gEmail}`)) {
        localStorage.setItem(`clipstream_credits_${gEmail}`, '10');
      }
      localStorage.setItem('clipstream_user_email', gEmail);
      window.location.href = '/dashboard/create';
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col relative overflow-hidden">
      {/* Header */}
      <header className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 relative z-20">
        <div className="flex justify-between items-center bg-slate-900/60 p-4 rounded-2xl border border-slate-800 backdrop-blur-md">
          <div className="flex items-center gap-2">
            <span className="text-xl">🚀</span>
            <span className="font-extrabold text-white tracking-wide">ClipStream AI</span>
          </div>
          <nav className="flex items-center gap-6">
            <Link href="/" className="text-sm font-medium text-purple-400 hover:text-purple-300 transition">Inicio</Link>
            <Link href="/dashboard/create" className="text-sm font-medium text-slate-300 hover:text-white transition">Crear</Link>
            <Link href="/pricing" className="text-sm font-medium text-slate-300 hover:text-white transition">Planes y Precios</Link>
          </nav>
        </div>
      </header>

      <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col lg:flex-row items-center justify-between gap-12 relative z-10 my-auto">
        <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-600/15 rounded-full blur-3xl pointer-events-none"></div>

        {/* Columna Izquierda: Slogan, Descripción e Imagen de Presentación */}
        <div className="max-w-xl text-left space-y-6">
          <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-tight">
            ¡Maximiza tu <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">Contenido!</span>
          </h1>
          <p className="text-lg text-purple-300 font-medium">
            La forma más inteligente de crear clips virales
          </p>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            ClipStream AI utiliza tecnología de vanguardia para analizar tus vídeos largos, extraer automáticamente los momentos más impactantes y convertirlos en clips cortos y dinámicos para redes sociales.
          </p>

          <div className="rounded-2xl overflow-hidden border border-slate-800 shadow-2xl bg-slate-900/50 p-2">
            <div className="bg-slate-950 rounded-xl p-4 text-xs text-slate-400 flex items-center justify-between">
              <span>⚡ Inteligencia Artificial Activa</span>
              <span className="text-purple-400 font-bold">Kling AI Engine + 10 Créditos Gratis</span>
            </div>
          </div>

          {/* Tarjeta Visual de Presentación */}
          <div className="relative w-full h-[180px] rounded-2xl overflow-hidden border border-slate-800 bg-gradient-to-br from-purple-900/40 via-slate-900 to-blue-950/40 p-6 flex flex-col justify-between shadow-2xl">
            <div className="flex justify-between items-center">
              <span className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-xs font-semibold border border-purple-500/30">Studio Profesional</span>
              <span className="text-xl">✨</span>
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Automatización Viral Inteligente</h3>
              <p className="text-xs text-slate-400 mt-1">Regístrate ahora y obtén 10 créditos gratuitos para empezar a recortar tus videos de inmediato.</p>
            </div>
          </div>
        </div>

        {/* Columna Derecha: Tarjeta Dinámica (Login / Registro / Recuperación) */}
        <div className="max-w-md w-full bg-slate-900/85 backdrop-blur-xl border border-slate-800 rounded-3xl p-8 shadow-2xl relative z-10">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-purple-600/20 text-purple-400 mb-2 font-bold text-lg">
              🎥
            </div>
            <h2 className="text-2xl font-extrabold text-white">
              {view === 'login' && 'Panel de Acceso'}
              {view === 'register' && 'Crear Cuenta Gratis'}
              {view === 'forgot' && 'Recuperar Contraseña'}
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              {view === 'login' && 'Accede a tu estudio de creación viral'}
              {view === 'register' && 'Regístrate y recibe 10 créditos gratis'}
              {view === 'forgot' && 'Usa tu pregunta secreta para recuperar el acceso'}
            </p>
          </div>

          {errorMessage && (
            <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-xl text-red-300 text-xs font-medium text-center">
              ⚠️ {errorMessage}
            </div>
          )}

          {successMessage && (
            <div className="mb-4 p-3 bg-green-500/20 border border-green-500/50 rounded-xl text-green-300 text-xs font-medium text-center">
              ✅ {successMessage}
            </div>
          )}

          {view === 'login' && (
            <>
              <button
                type="button"
                onClick={handleGoogleLogin}
                className="w-full mb-6 bg-slate-950 hover:bg-slate-800 border border-slate-800 text-white font-medium py-3 px-4 rounded-xl transition flex items-center justify-center gap-3 cursor-pointer shadow-md"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"/>
                  <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.13 0-5.78-2.11-6.73-4.96H1.18v3.15C3.17 21.36 7.23 24 12 24z"/>
                  <path fill="#FBBC05" d="M5.27 14.24c-.25-.72-.38-1.49-.38-2.24s.13-1.52.38-2.24V6.61H1.18C.43 8.13 0 9.87 0 12s.43 3.87 1.18 5.39l4.09-3.15z"/>
                  <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.23 0 3.17 2.64 1.18 6.61l4.09 3.15c.95-2.85 3.6-4.96 6.73-4.96z"/>
                </svg>
                <span>Continuar con Google</span>
              </button>

              <div className="relative flex py-2 items-center mb-4">
                <div className="flex-grow border-t border-slate-800"></div>
                <span className="flex-shrink mx-4 text-xs text-slate-500 uppercase">o con correo</span>
                <div className="flex-grow border-t border-slate-800"></div>
              </div>

              <form onSubmit={handleLoginSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1.5">Correo Electrónico</label>
                  <input
                    type="email"
                    required
                    placeholder="tu@correo.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 transition text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1.5">Contraseña</label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 pr-16 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 transition text-sm"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition text-xs font-medium px-2 py-1 cursor-pointer bg-slate-900/80 rounded-md border border-slate-800"
                    >
                      {showPassword ? 'Ocultar' : 'Ver'}
                    </button>
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => { setView('forgot'); setErrorMessage(''); setSuccessMessage(''); }}
                    className="text-xs text-purple-400 hover:text-purple-300 transition cursor-pointer"
                  >
                    ¿Olvidaste tu contraseña?
                  </button>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-bold py-3.5 px-6 rounded-xl transition shadow-lg shadow-purple-500/25 flex items-center justify-center gap-2 cursor-pointer text-sm"
                >
                  🚀 Entrar al Studio
                </button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-xs text-slate-400">
                  ¿No tienes cuenta aún?{' '}
                  <button
                    type="button"
                    onClick={() => { setView('register'); setErrorMessage(''); setSuccessMessage(''); }}
                    className="text-purple-400 hover:text-purple-300 font-semibold transition underline cursor-pointer ml-1"
                  >
                    Regístrate gratis
                  </button>
                </p>
              </div>
            </>
          )}

          {view === 'register' && (
            <form onSubmit={handleRegisterSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1.5">Correo Electrónico</label>
                <input
                  type="email"
                  required
                  placeholder="tu@correo.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 transition text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1.5">Contraseña</label>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 transition text-sm"
                />
              </div>

              <div className="pt-2 border-t border-slate-800">
                <label className="block text-xs font-semibold text-purple-300 mb-1">Pregunta Secreta (Para recuperación)</label>
                <select
                  value={secretQuestion}
                  onChange={(e) => setSecretQuestion(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white text-xs mb-2 focus:outline-none focus:border-purple-500"
                >
                  <option value="¿Cuál es el nombre de tu primera mascota?">¿Cuál es el nombre de tu primera mascota?</option>
                  <option value="¿En qué ciudad naciste?">¿En qué ciudad naciste?</option>
                  <option value="¿Cuál es tu comida favorita?">¿Cuál es tu comida favorita?</option>
                </select>
                <input
                  type="text"
                  required
                  placeholder="Tu respuesta secreta"
                  value={secretAnswer}
                  onChange={(e) => setSecretAnswer(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 transition text-sm"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-bold py-3.5 px-6 rounded-xl transition shadow-lg shadow-purple-500/25 flex items-center justify-center gap-2 cursor-pointer text-sm"
              >
                ✨ Registrarme y obtener 10 Créditos
              </button>

              <div className="mt-4 text-center">
                <button
                  type="button"
                  onClick={() => { setView('login'); setErrorMessage(''); }}
                  className="text-xs text-purple-400 hover:text-purple-300 transition underline cursor-pointer"
                >
                  ← Ya tengo cuenta, iniciar sesión
                </button>
              </div>
            </form>
          )}

          {view === 'forgot' && (
            <form onSubmit={handleRecoverSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1.5">Tu Correo Registrado</label>
                <input
                  type="email"
                  required
                  placeholder="tu@correo.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 transition text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1.5">Responde tu Pregunta Secreta</label>
                <p className="text-xs text-slate-400 mb-2 italic">{secretQuestion}</p>
                <input
                  type="text"
                  required
                  placeholder="Escribe tu respuesta exacta"
                  value={secretAnswer}
                  onChange={(e) => setSecretAnswer(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 transition text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1.5">Nueva Contraseña</label>
                <input
                  type="password"
                  required
                  placeholder="Mínimo 6 caracteres"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 transition text-sm"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-bold py-3.5 px-6 rounded-xl transition shadow-lg shadow-purple-500/25 flex items-center justify-center gap-2 cursor-pointer text-sm"
              >
                🔄 Restablecer Contraseña
              </button>

              <div className="mt-4 text-center">
                <button
                  type="button"
                  onClick={() => { setView('login'); setErrorMessage(''); setSuccessMessage(''); }}
                  className="text-xs text-purple-400 hover:text-purple-300 transition underline cursor-pointer"
                >
                  ← Volver al inicio de sesión
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
