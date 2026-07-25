import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Efectos de luz decorativos de fondo */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-xl w-full bg-slate-900/80 backdrop-blur-xl shadow-2xl rounded-3xl p-8 sm:p-10 text-center border border-slate-800 relative z-10">
        {/* Icono con gradiente */}
        <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-2xl bg-gradient-to-tr from-purple-600 to-blue-600 text-white text-4xl shadow-lg shadow-purple-500/30 mb-6">
          🎬
        </div>

        <div className="inline-block px-3 py-1 mb-4 text-xs font-semibold tracking-wider text-purple-400 uppercase bg-purple-500/10 rounded-full border border-purple-500/20">
          Inteligencia Artificial de Vanguardia
        </div>

        <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
          ClipStream <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">AI</span>
        </h1>
        
        <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
          Transforma tus ideas, enlaces y videos largos en clips virales automatizados de alto impacto para todas tus redes sociales en segundos.
        </p>

        <div className="mt-8 space-y-4">
          <Link
            href="/dashboard/create"
            className="w-full inline-flex justify-center items-center bg-gradient-to-r from-purple-600 to-blue-600 text-white py-4 px-6 rounded-xl font-bold text-lg hover:from-purple-500 hover:to-blue-500 transition-all shadow-lg shadow-blue-600/25 transform hover:-translate-y-0.5"
          >
            🚀 Ir al Generador de Videos
          </Link>
          
          <Link
            href="/pricing"
            className="w-full inline-flex justify-center items-center bg-slate-800 text-slate-200 py-4 px-6 rounded-xl font-semibold hover:bg-slate-700 transition border border-slate-700"
          >
            💎 Ver Planes y Precios
          </Link>
        </div>

        <div className="mt-8 pt-6 border-t border-slate-800/80 text-xs text-slate-500 flex justify-center gap-6">
          <span>⚡ Sin esperas</span>
          <span>🔒 Pago seguro</span>
          <span>✨ IA Avanzada</span>
        </div>
      </div>
    </div>
  );
}
