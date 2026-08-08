'use client';

import Link from 'next/link';

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col items-center">
        
        {/* Enlace corregido para volver al generador sin perder la sesión */}
        <div className="mb-6">
          <Link 
            href="/dashboard/create" 
            className="text-xs text-purple-400 hover:text-purple-300 font-semibold transition flex items-center gap-1.5 bg-slate-900 px-4 py-2 rounded-xl border border-slate-800"
          >
            ← Volver al Generador
          </Link>
        </div>

        <div className="text-center max-w-2xl mx-auto mb-12">
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Planes y Precios <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">ClipStream AI</span>
          </h1>
          <p className="text-slate-400 text-sm sm:text-base mt-3">
            Elige el plan ideal para transformar tus ideas y videos en contenido viral con IA de forma rentable.
          </p>
        </div>

        {/* Tarjetas de Precios */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl w-full">
          
          {/* Plan Pro */}
          <div className="bg-slate-900/80 border border-purple-500/30 rounded-3xl p-8 shadow-2xl relative flex flex-col justify-between">
            <div>
              <span className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-xs font-bold border border-purple-500/30">
                MÁS POPULAR
              </span>
              <h3 className="text-2xl font-extrabold text-white mt-4">Plan Pro</h3>
              <p className="text-slate-400 text-xs mt-2">
                Acceso completo al generador de clips virales con cuota mensual blindada.
              </p>
              <div className="my-6">
                <span className="text-4xl font-extrabold text-white">$9.00</span>
                <span className="text-slate-400 text-xs ml-2">USD / mes</span>
              </div>
            </div>
            <Link
              href="/success"
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-bold py-3.5 rounded-xl transition text-center text-sm shadow-lg shadow-purple-500/25 block"
            >
              🚀 Seleccionar Plan Pro
            </Link>
          </div>

          {/* Plan Agencia */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-8 shadow-2xl relative flex flex-col justify-between">
            <div>
              <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold border border-blue-500/30">
                MÁXIMO RENDIMIENTO
              </span>
              <h3 className="text-2xl font-extrabold text-white mt-4">Plan Agencia</h3>
              <p className="text-slate-400 text-xs mt-2">
                Licencia profesional y avanzada diseñada para creadores de alto volumen.
              </p>
              <div className="my-6">
                <span className="text-4xl font-extrabold text-white">$29.00</span>
                <span className="text-slate-400 text-xs ml-2">USD / mes</span>
              </div>
            </div>
            <Link
              href="/success"
              className="w-full bg-slate-950 hover:bg-slate-800 border border-slate-800 text-white font-bold py-3.5 rounded-xl transition text-center text-sm block"
            >
              ⚡ Seleccionar Plan Agencia
            </Link>
          </div>

        </div>
      </main>
    </div>
  );
}
