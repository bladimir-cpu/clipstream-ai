'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();

  // No mostrar la barra en la página de login
  if (pathname === '/login') return null;

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center space-x-8">
            <Link href="/dashboard/create" className="flex items-center space-x-2">
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                🎥 ClipStream AI
              </span>
            </Link>
            <div className="hidden md:flex space-x-4">
              <Link
                href="/dashboard/create"
                className={`px-3 py-2 rounded-lg text-sm font-medium transition ${
                  pathname === '/dashboard/create' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Generador
              </Link>
              <Link
                href="/pricing"
                className={`px-3 py-2 rounded-lg text-sm font-medium transition ${
                  pathname === '/pricing' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Precios y Créditos
              </Link>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Link
              href="/pricing"
              className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-xl text-sm font-medium shadow-sm hover:opacity-90 transition"
            >
              ⚡ Recargar Créditos
            </Link>
            <Link
              href="/login"
              className="text-gray-500 hover:text-gray-700 text-sm font-medium"
            >
              Salir
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}