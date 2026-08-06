'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LandingLoginPage() {
  const [viewMode, setViewMode] = useState<'login' | 'register' | 'forgot'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secretAnswer, setSecretAnswer] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const router = useRouter();

  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (!email || !email.includes('@')) {
      setErrorMessage('Por favor ingresa un correo electrónico válido.');
      return;
    }

    // FLUJO 1: REGISTRO NUEVO CON PREGUNTA SECRETA
    if (viewMode === 'register') {
      if (!password || password.length < 6) {
        setErrorMessage('La contraseña debe tener al menos 6 caracteres.');
        return;
      }
      if (!secretAnswer || secretAnswer.trim().length < 2) {
        setErrorMessage('Por seguridad, ingresa una respuesta secreta (ej. nombre de tu mascota).');
        return;
      }

      setLoading(true);
      setTimeout(() => {
        if (typeof window !== 'undefined') {
          localStorage.setItem(`clipstream_pass_${email}`, password);
          localStorage.setItem(`clipstream_sec_${email}`, secretAnswer.trim().toLowerCase());
          localStorage.setItem('clipstream_user_email', email);
        }
        router.push('/dashboard/create');
      }, 500);
      return;
    }

    // FLUJO 2: INICIO DE SESIÓN NORMAL
    if (viewMode === 'login') {
      if (!password || password.length < 6) {
        setErrorMessage('Por favor ingresa tu contraseña.');
        return;
      }

      setLoading(true);
      setTimeout(() => {
        if (typeof window !== 'undefined') {
          const savedPass = localStorage.getItem(`clipstream_pass_${email}`);
          if (savedPass && savedPass !== password) {
            setLoading(false);
            setErrorMessage('Contraseña incorrecta. Verifica tus datos.');
            return;
          }
          if (!savedPass) {
            // Si es un correo de prueba previo sin registro estricto
            localStorage.setItem(`clipstream_pass_${email}`, password);
          }
          localStorage.setItem('clipstream_user_email', email);
        }
        router.push('/dashboard/create');
      }, 500);
      return;
    }

    // FLUJO 3: RECUPERACIÓN SEGURA CON PREGUNTA SECRETA
    if (viewMode === 'forgot') {
      if (!secretAnswer || !newPassword) {
        setErrorMessage('Completa tu respuesta secreta y la nueva contraseña.');
        return;
      }
      if (newPassword.length < 6) {
        setErrorMessage('La nueva contraseña debe tener al menos 6 caracteres.');
        return;
      }

      setLoading(true);
      setTimeout(() => {
        if (typeof window !== 'undefined') {
          const savedSec = localStorage.getItem(`clipstream_sec_${email}`);
          
          // Si nunca registró pregunta secreta en este navegador
          if (!savedSec) {
            setLoading(false);
            setErrorMessage('No encontramos una pregunta de seguridad para este correo. Regístrate de nuevo.');
            return;
          }

          if (savedSec !== secretAnswer.trim().toLowerCase()) {
            setLoading(false);
            setErrorMessage('La respuesta secreta es incorrecta.');
            return;
          }

          // Si coincide, actualizamos la clave de forma segura
          localStorage.setItem(`clipstream_pass_${email}`, newPassword);
        }
        setLoading(false);
        setSuccessMessage('¡Contraseña recuperada con éxito! Inicia sesión ahora.');
        setTimeout(() => {
          setViewMode('login');
          setSuccessMessage('');
          setPassword('');
          setNewPassword('');
          setSecretAnswer('');
        }, 1500);
      }, 600);
      return;
    }
  };

  const handleGoogleLogin = () => {
    setLoading(true);
    setTimeout(() => {
      const chosenEmail = 'distribuidoresencalada@gmail.com';
      if (typeof window !== 'undefined') {
        localStorage.setItem('clipstream_user_email', chosenEmail);
      }
      router.push('/dashboard/create');
    }, 500);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col relative overflow-hidden">
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
              <span className="text-purple-400 font-bold">Kling AI Engine</span>
            </div>
          </div>
        </div>

        <div className="max-w-md w-full bg-slate-900/85 backdrop-blur-xl border border-slate-800 rounded-3xl p-8 shadow-2xl relative z-10">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-purple-600/20 text-purple-400 mb-2 font-bold text-lg">
              🎥
            </div>
            <h2 className="text-2xl font-extrabold text-white">
              {viewMode === 'register' && 'Crea tu Cuenta'}
              {viewMode === 'login' && 'Panel de Acceso'}
              {viewMode === 'forgot' && 'Recuperar Contraseña'}
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              {viewMode === 'register' && 'Configura tus datos y tu pregunta de seguridad'}
              {viewMode === 'login' && 'Accede a tu estudio de creación viral'}
              {viewMode === 'forgot' && 'Responde tu pregunta secreta para restablecer el acceso'}
            </p>
          </div>

          {errorMessage && (
            <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-xl text-red-300 text-xs font-medium text-center">
              ⚠️ {errorMessage}
            </div>
          )}

          {successMessage && (
            <div className="mb-4 p-3 bg-emerald-500/20 border border-emerald-500/50 rounded-xl text-emerald-300 text-xs font-medium text-center">
              ✅ {successMessage}
            </div>
          )}

          {viewMode === 'login' && (
            <>
              <button
                type="button"
                onClick={handleGoogleLogin}
                disabled={loading}
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
            </>
          )}

          <form onSubmit={handleAuthSubmit} className="space-y-4">
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

            {viewMode === 'login' && (
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="block text-sm font-medium text-slate-300">Contraseña</label>
                  <button
                    type="button"
                    onClick={() => { setViewMode('forgot'); setErrorMessage(''); setSuccessMessage(''); }}
                    className="text-xs text-purple-400 hover:text-purple-300 transition cursor-pointer"
                  >
                    ¿Olvidaste tu contraseña?
                  </button>
                </div>
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
            )}

            {viewMode === 'register' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1.5">Contraseña</label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      placeholder="Mínimo 6 caracteres"
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
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1.5">Pregunta de Seguridad</label>
                  <p className="text-[11px] text-slate-400 mb-1">Ej: ¿Cómo se llama tu mascota o cuál es tu ciudad natal?</p>
                  <input
                    type="text"
                    required
                    placeholder="Tu respuesta secreta"
                    value={secretAnswer}
                    onChange={(e) => setSecretAnswer(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 transition text-sm"
                  />
                </div>
              </>
            )}

            {viewMode === 'forgot' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1.5">Respuesta Secreta</label>
                  <input
                    type="text"
                    required
                    placeholder="Ingresa tu respuesta configurada"
                    value={secretAnswer}
                    onChange={(e) => setSecretAnswer(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 transition text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1.5">Nueva Contraseña</label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      placeholder="Mínimo 6 caracteres"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
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
              </>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-bold py-3.5 px-6 rounded-xl transition shadow-lg shadow-purple-500/25 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 text-sm"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a88 8 0 018-8v8H4z"></path>
                  </svg>
                  <span>Procesando...</span>
                </>
              ) : (
                <>
                  {viewMode === 'register' && '✨ Registrarme con Seguridad'}
                  {viewMode === 'login' && '🚀 Entrar al Studio'}
                  {viewMode === 'forgot' && '🔄 Restablecer mi Contraseña'}
                </>
              )}
            </button>
          </form>

          <div className="mt-6 text-center space-y-2">
            {viewMode === 'forgot' ? (
              <p className="text-xs text-slate-400">
                ¿Recordaste tu clave?{' '}
                <button
                  type="button"
                  onClick={() => { setViewMode('login'); setErrorMessage(''); setSuccessMessage(''); }}
                  className="text-purple-400 hover:text-purple-300 font-semibold transition underline cursor-pointer ml-1"
                >
                  Volver al inicio de sesión
                </button>
              </p>
            ) : (
              <p className="text-xs text-slate-400">
                {viewMode === 'register' ? '¿Ya tienes una cuenta?' : '¿No tienes cuenta aún?'}{' '}
                <button
                  type="button"
                  onClick={() => {
                    setViewMode(viewMode === 'register' ? 'login' : 'register');
                    setErrorMessage('');
                    setSuccessMessage('');
                  }}
                  className="text-purple-400 hover:text-purple-300 font-semibold transition underline cursor-pointer ml-1"
                >
                  {viewMode === 'register' ? 'Inicia sesión aquí' : 'Regístrate gratis'}
                </button>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
