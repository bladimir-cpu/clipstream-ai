import Link from 'next/link';

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Efectos de luz decorativos de fondo */}
      <div className="absolute top-10 left-1/4 w-96 h-96 bg-purple-600/15 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Cabecera */}
        <div className="text-center mb-12">
          <Link href="/" className="inline-block text-sm font-semibold text-purple-400 mb-3 hover:text-purple-300 transition">
            ← Volver al inicio
          </Link>
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            Planes y <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">Créditos</span>
          </h1>
          <p className="mt-4 text-lg text-slate-300 max-w-2xl mx-auto">
            Elige el plan ideal para automatizar tus videos y escalar tus redes sociales al siguiente nivel con Inteligencia Artificial.
          </p>
        </div>

        {/* Tarjetas de Precios */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          
          {/* Plan Básico ($9) */}
          <div className="bg-slate-900/80 backdrop-blur-xl rounded-3xl p-8 border border-slate-800 shadow-xl">
            <h3 className="text-2xl font-bold text-white">Creador Inicial</h3>
            <p className="text-slate-400 mt-2 text-sm">Ideal para creadores que están empezando a automatizar su contenido.</p>
            <div className="my-6">
              <span className="text-4xl font-extrabold text-white">$9</span>
              <span className="text-slate-400 text-sm"> / mes</span>
            </div>
            <ul className="space-y-3 text-slate-300 text-sm mb-8">
              <li className="flex items-center gap-2">✅ 50 Clips generados por IA</li>
              <li className="flex items-center gap-2">✅ Subtítulos automáticos</li>
              <li className="flex items-center gap-2">✅ Exportación en HD</li>
              <li className="flex items-center gap-2 text-slate-500">❌ Soporte prioritario 24/7</li>
            </ul>
            {/* ENLACE PAYPAL PLAN $9 */}
            <a 
              href="https://www.paypal.com/ncp/payment/DZJRLLWB2Z48Q" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full inline-block text-center bg-slate-800 hover:bg-slate-700 text-white font-semibold py-3 px-6 rounded-xl transition border border-slate-700"
            >
              Elegir Plan Inicial
            </a>
          </div>

          {/* Plan Pro Destacado ($19) */}
          <div className="bg-gradient-to-b from-slate-900 to-slate-900/90 backdrop-blur-xl rounded-3xl p-8 border-2 border-purple-500/50 shadow-2xl shadow-purple-500/10 relative">
            <div className="absolute -top-3 right-8 bg-gradient-to-r from-purple-600 to-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              Más Popular
            </div>
            <h3 className="text-2xl font-bold text-white">Pro Ilimitado</h3>
            <p className="text-slate-400 mt-2 text-sm">Para creadores y marcas que buscan el máximo impacto y viralidad.</p>
            <div className="my-6">
              <span className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">$19</span>
              <span className="text-slate-400 text-sm"> / mes</span>
            </div>
            <ul className="space-y-3 text-slate-300 text-sm mb-8">
              <li className="flex items-center gap-2">🚀 Clips generados ILIMITADOS</li>
              <li className="flex items-center gap-2">⚡ IA Avanzada de ultra velocidad</li>
              <li className="flex items-center gap-2">✨ Plantillas virales exclusivas</li>
              <li className="flex items-center gap-2">💎 Soporte prioritario 24/7</li>
            </ul>
            {/* ENLACE PAYPAL PLAN $19 */}
            <a 
              href="https://www.paypal.com/ncp/payment/YRAPF7XPJNL2Q" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full inline-block text-center bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-bold py-3 px-6 rounded-xl transition shadow-lg shadow-purple-500/25"
            >
              Obtener Plan Pro
            </a>
          </div>

        </div>
      </div>
    </div>
  );
}
