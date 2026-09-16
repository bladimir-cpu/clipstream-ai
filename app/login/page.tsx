'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { createClient } from '@/lib/supabase/client';

export default function LoginPage() {
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // Estados para el Modal de Recuperación de Contraseña (flujo por enlace de correo)
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotSent, setForgotSent] = useState(false);

  const router = useRouter();
  const supabase = createClient();

  // Validación estricta para correos reales
  const isValidRealEmail = (mail: string) => {
    const cleanMail = mail.trim().toLowerCase();
    const regex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
    if (!regex.test(cleanMail)) return false;

    const usernamePart = cleanMail.split('@')[0];
    const isRepeatedChars = /^([a-z0-9])\1{3,}$/.test(usernamePart);
    if (isRepeatedChars || usernamePart.length < 3) {
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isValidRealEmail(email)) {
      alert('Por favor ingresa un correo electrónico real y válido.');
      return;
    }

    if (!password || password.length < 6) {
      alert('La contraseña debe tener al menos 6 caracteres.');
      return;
    }

    setLoading(true);

    try {
      if (isRegistering) {
        if (!name.trim()) {
          alert('Por favor ingresa tu nombre completo.');
          setLoading(false);
          return;
        }

        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { full_name: name },
            emailRedirectTo: `${window.location.origin}/auth/callback`,
          },
        });

        if (error) {
          if (error.message.toLowerCase().includes('already registered')) {
            alert('Este correo ya está registrado. Por favor inicia sesión.');
          } else {
            alert('Error al crear la cuenta: ' + error.message);
          }
          setLoading(false);
          return;
        }

        // Si el proyecto tiene "Confirm email" activado, Supabase no devuelve sesión todavía
        if (data.user && !data.session) {
          alert('¡Cuenta creada! Revisa tu correo para confirmar tu cuenta antes de iniciar sesión.');
          setIsRegistering(false);
          setLoading(false);
          return;
        }

        router.push('/dashboard/create');
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });

        if (error) {
          alert('Correo o contraseña incorrectos.');
          setLoading(false);
          return;
        }

        router.push('/dashboard/create');
      }
    } catch (err) {
      console.error('Error:', err);
      alert('Ocurrió un error en el acceso.');
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      alert('Error al iniciar sesión con Google: ' + error.message);
      setLoading(false);
    }
    // Si no hay error, el navegador redirige a Google automáticamente.
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isValidRealEmail(forgotEmail)) {
      alert('Ingresa un correo válido.');
      return;
    }

    setLoading(true);
    const { error } = await supabase.auth.resetPasswordForEmail(forgotEmail, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    setLoading(false);

    if (error) {
      alert('Error al enviar el enlace: ' + error.message);
      return;
    }

    setForgotSent(true);
  };

  const closeForgotModal = () => {
    setShowForgotModal(false);
    setForgotEmail('');
    setForgotSent(false);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col relative overflow-hidden">
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

          <div className="mt-8 relative w-full h-[300px] rounded-2xl overflow-hidden border border-slate-800 shadow-2xl bg-slate-900 flex items-center justify-center">
            <Image
              src="/image_8ec2bd.png"
              alt="ClipStream AI Dashboard"
              fill
              className="object-cover"
              priority
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-tr from-purple-950/80 to-slate-900/80 text-center p-6 pointer-events-none">
              <span className="text-4xl mb-2">🎥✨</span>
              <p className="text-sm font-bold text-purple-200">Panel de Creación Automatizada</p>
              <p className="text-xs text-slate-400 mt-1">Transforma horas de video en minutos de viralidad</p>
            </div>
          </div>
        </div>

        <div className="max-w-md w-full bg-slate-900/85 backdrop-blur-xl border border-slate-800 rounded-3xl p-8 shadow-2xl relative z-10">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-purple-600/20 text-purple-400 mb-2 font-bold text-lg">
              🎥
            </div>
            <h2 className="text-2xl font-extrabold text-white">
              {isRegistering ? 'Crear una Cuenta' : 'Iniciar Sesión'}
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              {isRegistering ? 'Empieza gratis con validación segura' : 'Accede a tu estudio de creación viral'}
            </p>
          </div>

          <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full mb-6 bg-slate-950 hover:bg-slate-800 border border-slate-800 text-white font-medium py-3 px-4 rounded-xl transition flex items-center justify-center gap-3 cursor-pointer shadow-md disabled:opacity-50"
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

          <form onSubmit={handleSubmit} className="space-y-4">
            {isRegistering && (
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1.5">Nombre Completo</label>
                <input
                  type="text"
                  required
                  placeholder="Tu nombre"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 transition text-sm"
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">Correo Electrónico (Real)</label>
              <input
                type="email"
                required
                placeholder="tu.correo@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 transition text-sm"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="block text-sm font-medium text-slate-300">Contraseña</label>
                {!isRegistering && (
                  <button
                    type="button"
                    onClick={() => setShowForgotModal(true)}
                    className="text-xs text-purple-400 hover:text-purple-300 transition cursor-pointer"
                  >
                    ¿Olvidaste tu contraseña?
                  </button>
                )}
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

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-bold py-3.5 px-6 rounded-xl transition shadow-lg shadow-purple-500/25 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 text-sm"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                  </svg>
                  <span>Procesando...</span>
                </>
              ) : (
                <>{isRegistering ? '🚀 Crear Cuenta Segura' : '🚀 Entrar al Studio'}</>
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-xs text-slate-400">
              {isRegistering ? '¿Ya tienes una cuenta?' : '¿No tienes cuenta aún?'}{' '}
              <button
                type="button"
                onClick={() => setIsRegistering(!isRegistering)}
                className="text-purple-400 hover:text-purple-300 font-semibold transition cursor-pointer ml-1"
              >
                {isRegistering ? 'Inicia sesión aquí' : 'Regístrate aquí'}
              </button>
            </p>
          </div>
        </div>
      </div>

      {showForgotModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl relative">
            <button
              onClick={closeForgotModal}
              className="absolute top-4 right-4 text-slate-400 hover:text-white text-sm font-bold bg-slate-800 px-3 py-1 rounded-xl cursor-pointer"
            >
              ✕
            </button>

            <h3 className="text-xl font-extrabold text-white mb-2">Recuperar Contraseña</h3>

            {!forgotSent ? (
              <>
                <p className="text-xs text-slate-400 mb-6">
                  Escribe tu correo y te enviaremos un enlace para restablecer tu contraseña.
                </p>
                <form onSubmit={handleForgotPassword} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1.5">Tu Correo Electrónico</label>
                    <input
                      type="email"
                      required
                      placeholder="correo@gmail.com"
                      value={forgotEmail}
                      onChange={(e) => setForgotEmail(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 text-sm"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-purple-600 hover:bg-purple-500 text-white font-bold py-3 rounded-xl transition text-sm cursor-pointer shadow-lg disabled:opacity-50"
                  >
                    {loading ? 'Enviando...' : 'Enviar Enlace de Recuperación ➔'}
                  </button>
                </form>
              </>
            ) : (
              <div className="text-center py-4">
                <p className="text-4xl mb-3">📬</p>
                <p className="text-sm text-white font-semibold mb-1">¡Revisa tu correo!</p>
                <p className="text-xs text-slate-400">
                  Te enviamos un enlace a <span className="text-purple-300">{forgotEmail}</span> para restablecer tu contraseña.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
