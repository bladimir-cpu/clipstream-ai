'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Luces de fondo decorativas */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-5xl mx-auto relative z-10">
        
        {/* Encabezado */}
        <div className="text-center mb-10">
          <Link href="/" className="text-sm font-semibold text-purple-400 hover:text-purple-300 transition inline-block mb-4">
            ← Volver al inicio
          </Link>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-3">
            Planes y Precios <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">ClipStream AI</span>
          </h1>
          <p className="text-slate-400 text-base max-w-xl mx-auto mb-8">
            Elige el plan ideal para transformar tus ideas y videos en contenido viral con IA.
          </p>

          {/* Interruptor Mensual / Anual con Aviso de Descuento */}
          <div className="inline-flex items-center bg-slate-900 border border-slate-800 p-1.5 rounded-2xl shadow-inner">
            <button
              type="button"
              onClick={() => setBillingCycle('monthly')}
              className={`py-2 px-6 rounded-xl text-sm font-semibold transition cursor-pointer ${billingCycle === 'monthly' ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
            >
              Pago Mensual
            </button>
            <button
              type="button"
              onClick={() => setBillingCycle('annual')}
              className={`py-2 px-6 rounded-xl text-sm font-semibold transition cursor-pointer ${billingCycle === 'annual' ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
            >
              Pago Anual <span className="text-xs bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2.5 py-0.5 rounded-full ml-1.5 font-bold">¡2 Meses Gratis / 30% OFF!</span>
            </button>
          </div>
        </div>

        {/* Tarjetas de Precios */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          
          {/* Plan Pro */}
          <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-3xl p-8 shadow-2xl flex flex-col justify-between transition hover:border-purple-500/50 relative">
            {billingCycle === 'annual' && (
              <div className="absolute -top-3 right-6 bg-emerald-500 text-slate-950 text-xs font-black px-3 py-1 rounded-full shadow-lg uppercase tracking-wider">
                Ahorras $29 al año
              </div>
            )}
            <div>
              <div className="inline-block bg-purple-500/10 text-purple-400 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-4 border border-purple-500/20">
                Más Popular
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">
                {billingCycle === 'annual' ? 'ClipStream AI - Plan Pro (Anual)' : 'ClipStream AI - Plan Pro'}
              </h3>
              <p className="text-slate-400 text-sm mb-6">
                Acceso completo e ilimitado al generador de clips virales. Transforma enlaces de YouTube o textos en contenido listo para TikTok y Reels.
              </p>
              
              <div className="mb-6">
                <span className="text-4xl font-extrabold text-white">
                  {billingCycle === 'annual' ? '$79.00' : '$9.00'}
                </span>
                <span className="text-slate-400 text-sm">
                  {billingCycle === 'annual' ? ' USD / año' : ' USD / mes'}
                </span>
                {billingCycle === 'annual' && (
                  <p className="text-xs text-emerald-400 mt-1 font-medium">Equivale a solo $6.58 al mes</p>
                )}
              </div>

              <ul className="space-y-3 text-sm text-slate-300 mb-8">
                <li className="flex items-center gap-2">✅ Generación ilimitada de clips</li>
                <li className="flex items-center gap-2">✅ Prioridad de procesamiento IA</li>
                <li className="flex items-center gap-2">✅ Formatos optimizados para TikTok/Reels</li>
                <li className="flex items-center gap-2">✅ Soporte técnico dedicado</li>
              </ul>
            </div>

            <a
              href={billingCycle === 'annual' ? "https://www.paypal.com/ncp/payment/R9P86UDB374JE" : "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-bold py-4 px-6 rounded-xl transition shadow-lg shadow-purple-500/25 text-center block cursor-pointer"
            >
              {billingCycle === 'annual' ? 'Obtener Plan Pro Anual 🚀' : 'Obtener Plan Pro Mensual 🚀'}
            </a>
          </div>

          {/* Plan Agencia / Avanzado */}
          <div className="bg-slate-900/80 backdrop-blur-xl border border-purple-500/40 rounded-3xl p-8 shadow-2xl flex flex-col justify-between relative overflow-hidden">
            {billingCycle === 'annual' && (
              <div className="absolute top-4 right-6 bg-emerald-500 text-slate-950 text-xs font-black px-3 py-1 rounded-full shadow-lg uppercase tracking-wider">
                Ahorras $169 al año
              </div>
            )}
            <div className="absolute -top-12 -right-12 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl pointer-events-none"></div>
            <div>
              <div className="inline-block bg-blue-500/10 text-blue-400 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-4 border border-blue-500/20">
                Máximo Rendimiento
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">
                {billingCycle === 'annual' ? 'ClipStream AI - Plan Agencia (Anual)' : 'ClipStream AI - Plan Agencia'}
              </h3>
              <p className="text-slate-400 text-sm mb-6">
                Licencia profesional y avanzada diseñada para creadores de alto volumen y agencias que buscan máxima velocidad y funciones exclusivas.
              </p>
              
              <div className="mb-6">
                <span className="text-4xl font-extrabold text-white">
                  {billingCycle === 'annual' ? '$179.00' : '$29.00'}
                </span>
                <span className="text-slate-400 text-sm">
                  {billingCycle === 'annual' ? ' USD / año' : ' USD / mes'}
                </span>
                {billingCycle === 'annual' && (
                  <p className="text-xs text-emerald-400 mt-1 font-medium">Equivale a solo $14.91 al mes</p>
                )}
              </div>

              <ul className="space-y-3 text-sm text-slate-300 mb-8">
                <li className="flex items-center gap-2">✅ Todo lo del Plan Pro incluido</li>
                <li className="flex items-center gap-2">✅ Máxima velocidad de IA prioritaria</li>
                <li className="flex items-center gap-2">✅ Funciones exclusivas para agencias</li>
                <li className="flex items-center gap-2">✅ Soporte prioritario VIP 24/7</li>
              </ul>
            </div>

            <a
              href={billingCycle === 'annual' ? "https://www.paypal.com/ncp/payment/MJRFZ76NLQUVY" : "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold py-4 px-6 rounded-xl transition shadow-lg shadow-blue-500/25 text-center block cursor-pointer"
            >
              {billingCycle === 'annual' ? 'Obtener Plan Agencia Anual ⭐' : 'Obtener Plan Agencia Mensual ⭐'}
            </a>
          </div>

        </div>

      </div>
    </div>
  );
}
