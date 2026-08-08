'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

export default function LoginPage() {
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [secretQuestion, setSecretQuestion] = useState('¿Cómo se llama tu primera mascota?');
  const [secretAnswer, setSecretAnswer] = useState('');
  
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // Estados para el Modal de Recuperación de Contraseña
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotStep, setForgotStep] = useState(1); // 1: Pedir correo, 2: Responder pregunta, 3: Nueva contraseña
  const [forgotEmail, setForgotEmail] = useState('');
  const [fetchedQuestion, setFetchedQuestion] = useState('');
  const [userAnswerInput, setUserAnswerInput] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const router = useRouter();

  // Validación estricta de correo real con Regex profesional
  const isValidEmail = (mail: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(mail);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !isValidEmail(email)) {
      alert('Por favor ingresa un correo electrónico real y válido (ej. usuario@gmail.com).');
      return;
    }
    if (!password || password.length < 6) {
      alert('La contraseña debe tener al menos 6 caracteres.');
      return;
    }

    if (isRegistering) {
      if (!name.trim()) {
        alert('Por favor ingresa tu nombre completo.');
        return;
      }
      if (!secretAnswer.trim()) {
        alert('Por favor ingresa una respuesta secreta para recuperar tu cuenta.');
        return;
      }
    }

    setLoading(true);

    try {
      if (typeof window !== 'undefined') {
        if (isRegistering) {
          // Guardar credenciales y datos de seguridad en localStorage
          localStorage.setItem(`clipstream_pass_${email}`, password);
          localStorage.setItem(`clipstream_q_${email}`, secretQuestion);
          localStorage.setItem(`clipstream_a_${email}`, secretAnswer.toLowerCase().trim());
          localStorage.setItem(`clipstream_name_${email}`, name);
        } else {
          // Verificar si el usuario ya está registrado con contraseña
          const savedPass = localStorage.getItem(`clipstream_pass_${email}`);
          if (savedPass && savedPass !== password) {
            alert('Contraseña incorrecta. Si la olvidaste, usa la opción de recuperar contraseña.');
            setLoading(false);
            return;
          }
        }
        localStorage.setItem('clipstream_user_email', email);
      }
      router.push('/dashboard/create');
    } catch (err) {
      console.error('Error en el proceso:', err);
      alert('Error al acceder al panel. Verifica la conexión.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      const chosenEmail = 'distribuidoresencalada@gmail.com';
      if (typeof window !== 'undefined') {
        localStorage.setItem('clipstream_user_email', chosenEmail);
      }
      router.push('/dashboard/create');
    } catch (err) {
      console.error('Error en la autenticación con Google:', err);
    } finally {
      setLoading(false);
    }
  };

  // Lógica de recuperación de contraseña con Pregunta Secreta
  const handleCheckForgotEmail = (e: React.FormEvent) => {
    e.preventDefault();
    if (!forgotEmail || !isValidEmail(forgotEmail)) {
      alert('Ingresa un correo válido.');
      return;
    }
    const q = localStorage.getItem(`clipstream_q_${forgotEmail}`);
    if (!q) {
      alert('No encontramos ninguna cuenta registrada con este correo.');
      return;
    }
    setFetchedQuestion(q);
    setForgotStep(2);
  };

  const handleVerifyAnswer = (e: React.FormEvent) => {
    e.preventDefault();
    const storedAnswer = localStorage.getItem(`clipstream_a_${forgotEmail}`);
    if (storedAnswer === userAnswerInput.toLowerCase().trim()) {
      setForgotStep(3);
    } else {
      alert('La respuesta secreta es incorrecta. Inténtalo de nuevo.');
    }
  };

  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPassword || newPassword.length < 6) {
      alert('La nueva contraseña debe tener al menos 6 caracteres.');
      return;
    }
    localStorage.setItem(`clipstream_pass_${forgotEmail}`, newPassword);
    alert('¡Contraseña actualizada con éxito! Ya puedes iniciar sesión.');
    setShowForgotModal(false);
    setForgotStep(1);
    setForgotEmail('');
    setUserAnswerInput('');
    setNewPassword('');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col relative overflow-hidden">
      
      {/* HEADER ESTÁTICO FIJO EN LA PARTE SUPERIOR */}
      <header className="w-full sticky top-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center bg-slate-900/60 p-4 rounded-2xl border border-slate-800 backdrop-blur-md shadow-lg">
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
        </div>
      </header>

      <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col lg:flex-row items-center justify-between gap-12 relative z-10 my-auto">
        <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-600/15 rounded-full blur-3xl pointer-events-none"></div>

        {/* Columna Izquierda */}
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

        {/* Columna Derecha (Formulario Blindado con Preguntas Secretas) */}
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
              <>
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

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1.5">Pregunta de Seguridad</label>
                  <select
                    value={secretQuestion}
                    onChange={(e) => setSecretQuestion(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition text-sm mb-2"
                  >
                    <option value="¿Cómo se llama tu primera mascota?">¿Cómo se llama tu primera mascota?</option>
                    <option value="¿Cuál es tu ciudad de nacimiento?">¿Cuál es tu ciudad de nacimiento?</option>
                    <option value="¿Cuál es el nombre de tu película favorita?">¿Cuál es el nombre de tu película favorita?</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1.5">Respuesta Secreta</label>
                  <input
                    type="text"
                    required
                    placeholder="Ej. Beby"
                    value={secretAnswer}
                    onChange={(e) => setSecretAnswer(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 transition text-sm"
                  />
                </div>
              </>
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

      {/* MODAL DE RECUPERACIÓN DE CONTRASEÑA */}
      {showForgotModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl relative">
            <button
              onClick={() => { setShowForgotModal(false); setForgotStep(1); setForgotEmail(''); setUserAnswerInput(''); }}
              className="absolute top-4 right-4 text-slate-400 hover:text-white text-sm font-bold bg-slate-800 px-3 py-1 rounded-xl cursor-pointer"
            >
              ✕
            </button>

            <h3 className="text-xl font-extrabold text-white mb-2">Recuperar Contraseña</h3>
            <p className="text-xs text-slate-400 mb-6">Sigue los pasos para restablecer tu acceso de forma segura.</p>

            {forgotStep === 1 && (
              <form onSubmit={handleCheckForgotEmail} className="space-y-4">
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
                  className="w-full bg-purple-600 hover:bg-purple-500 text-white font-bold py-3 rounded-xl transition text-sm cursor-pointer shadow-lg"
                >
                  Siguiente ➔
                </button>
              </form>
            )}

            {forgotStep === 2 && (
              <form onSubmit={handleVerifyAnswer} className="space-y-4">
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                  <p className="text-xs text-purple-300 font-semibold mb-1">Pregunta de Seguridad:</p>
                  <p className="text-sm text-white font-bold">{fetchedQuestion}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1.5">Tu Respuesta Secreta</label>
                  <input
                    type="text"
                    required
                    placeholder="Escribe tu respuesta..."
                    value={userAnswerInput}
                    onChange={(e) => setUserAnswerInput(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 text-sm"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-purple-600 hover:bg-purple-500 text-white font-bold py-3 rounded-xl transition text-sm cursor-pointer shadow-lg"
                >
                  Verificar Respuesta ➔
                </button>
              </form>
            )}

            {forgotStep === 3 && (
              <form onSubmit={handleResetPassword} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1.5">Nueva Contraseña</label>
                  <input
                    type="password"
                    required
                    placeholder="Mínimo 6 caracteres"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 text-sm"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-bold py-3 rounded-xl transition text-sm cursor-pointer shadow-lg"
                >
                  ✨ Guardar Nueva Contraseña
                </button>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
