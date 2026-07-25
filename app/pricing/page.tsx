'use client';

import Link from 'next/link';

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Luces de fondo decorativas */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-5xl mx-auto relative z-10">
        
        {/* Encabezado */}
        <div className="text-center mb-12">
          <Link href="/" className="text-sm font-semibold text-purple-400 hover:text-purple-300 transition inline-block mb-4">
            ← Volver al inicio
          </Link>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-3">
            Planes Anuales <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">ClipStream AI</span>
          </h1>
          <p className="text-slate-400 text-base max-w-xl mx-auto">
            Invierte en tu contenido por todo un año, ahorra dinero y escala tus redes sociales al siguiente nivel con IA.
          </p>
        </div>

        {/* Tarjetas de Precios Anuales */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          
          {/* Plan Pro Anual ($79) */}
          <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-3xl p-8 shadow-2xl flex flex-col justify-between transition hover:border-purple-500/50">
            <div>
              <div className="inline-block bg-purple-500/10 text-purple-400 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-4 border border-purple-500/20">
                Más Popular
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">ClipStream AI - Plan Pro (Acceso Anual)</h3>
              <p className="text-slate-400 text-sm mb-6">
                Acceso completo e ilimitado al generador de clips virales por todo un año. Transforma enlaces de YouTube o textos en contenido listo para TikTok y Reels.
              </p>
              
              <div className="mb-6">
                <span className="text-4xl font-extrabold text-white">$79.00</span>
                <span className="text-slate-400 text-sm"> USD / año</span>
              </div>

              <ul className="space-y-3 text-sm text-slate-300 mb-8">
                <li className="flex items-center gap-2">✅ Generación ilimitada de clips</li>
                <li className="flex items-center gap-2">✅ Prioridad de procesamiento IA</li>
                <li className="flex items-center gap-2">✅ Formatos optimizados para TikTok/Reels</li>
                <li className="flex items-center gap-2">✅ Soporte técnico por 12 meses</li>
              </ul>
            </div>

            <a
              href="https://www.paypal.com/ncp/payment/R9P86UDB374JE"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-bold py-4 px-6 rounded-xl transition shadow-lg shadow-purple-500/25 text-center block cursor-pointer"
            >
              Obtener Plan Pro Anual 🚀
            </a>
          </div>

          {/* Plan Agencia Anual ($179) */}
          <div className="bg-slate-900/80 backdrop-blur-xl border border-purple-500/40 rounded-3xl p-8 shadow-2xl flex flex-col justify-between relative overflow-hidden">
            <div className="absolute -top-12 -right-12 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl pointer-events-none"></div>
            <div>
              <div className="inline-block bg-blue-500/10 text-blue-400 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-4 border border-blue-500/20">
                Máximo Rendimiento
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">ClipStream AI - Plan Agencia (Acceso Anual)</h3>
              <p className="text-slate-400 text-sm mb-6">
                Licencia profesional y avanzada diseñada para creadores de alto volumen y agencias que buscan máxima velocidad y funciones exclusivas.
              </p>
              
              <div className="mb-6">
                <span className="text-4xl font-extrabold text-white">$179.00</span>
                <span className="text-slate-400 text-sm"> USD / año</span>
              </div>

              <ul className="space-y-3 text-sm text-slate-300 mb-8">
                <li className="flex items-center gap-2">✅ Todo lo del Plan Pro incluido</li>
                <li className="flex items-center gap-2">✅ Máxima velocidad de IA prioritaria</li>
                <li className="flex items-center gap-2">✅ Funciones exclusivas para agencias</li>
                <li className="flex items-center gap-2">✅ Soporte prioritario VIP 24/7</li>
              </ul>
            </div>

            <a
              href="https://www.paypal.com/ncp/payment/MJRFZ76NLQUVY"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold py-4 px-6 rounded-xl transition shadow-lg shadow-blue-500/25 text-center block cursor-pointer"
            >
              Obtener Plan Agencia ⭐
            </a>
          </div>

        </div>

      </div>
    </div>
  );
}
