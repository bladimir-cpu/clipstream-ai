'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const email = localStorage.getItem('clipstream_user_email');
      if (email) {
        setUserEmail(email);
      }
    }
  }, [pathname]);

  // Si estamos en la página de login (raíz), no mostramos la barra superior
  if (pathname === '/' || pathname === '/login') return null;

  // Si un usuario intenta entrar a otra sección (como precios) sin haber iniciado sesión, lo devolvemos al login
  if (!userEmail && typeof window !== 'undefined') {
    router.push('/');
    return null;
  }

  const handleLogout = (e: React.MouseEvent) => {
    e.preventDefault();
    if (typeof window !== 'undefined') {
      localStorage.removeItem('clipstream_user_email');
    }
    router.push('/');
  };

  return (
    <nav className="bg-slate-900/85 backdrop-blur-md border-b border-slate-800 sticky top-0 z-50 text-slate-100 shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center space-x-6">
            <Link href="/dashboard/create" className="flex items-center space-x-2">
              <span className="text-xl font-extrabold text-white tracking-wide">
                🎥 ClipStream AI
              </span>
            </Link>
            <div className="hidden md:flex space-x-3">
              <Link
                href="/dashboard/create"
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition ${
                  pathname === '/dashboard/create' ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30' : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                ⚡ Generador
              </Link>
              <Link
                href="/pricing"
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition ${
                  pathname === '/pricing' ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30' : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                💎 Precios y Créditos
              </Link>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            {userEmail && (
              <span className="hidden lg:inline-flex text-xs text-purple-300 bg-purple-500/10 px-3 py-1.5 rounded-full border border-purple-500/25 font-medium">
                👤 {userEmail}
              </span>
            )}

            <Link
              href="/pricing"
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white px-3.5 py-2 rounded-xl text-xs font-bold shadow-lg shadow-purple-500/25 transition"
            >
              ⚡ Recargar
            </Link>
            <button
              onClick={handleLogout}
              className="text-xs font-medium text-slate-400 hover:text-red-400 transition cursor-pointer bg-slate-950 px-3 py-2 rounded-xl border border-slate-800"
            >
              Salir
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
