'use client';

import { useState } from 'react';

export default function PricingPage() {
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);

  const handleCheckout = (planType: string) => {
    setLoadingPlan(planType);
    
    setTimeout(() => {
      if (planType === 'Creador') {
        window.location.href = 'https://www.paypal.com/ncp/payment/DZJRLLWB2Z48Q';
      } else {
        window.location.href = 'https://www.paypal.com/ncp/payment/YRAPF7XPJNL2Q';
      }
    }, 800);
  };

  return (
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">
          Planes y Recarga de Créditos
        </h2>
        <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
          Desbloquea todo el poder de la Inteligencia Artificial y escala la producción de tus videos profesionales con pago seguro vía PayPal.
        </p>
      </div>

      <div className="mt-16 max-w-5xl mx-auto grid grid-cols-1 gap-8 sm:grid-cols-2">
        {/* Plan Creador */}
        <div className="bg-white border border-gray-200 rounded-3xl shadow-sm p-8 flex flex-col justify-between hover:shadow-md transition">
          <div>
            <span className="inline-block bg-blue-50 text-blue-600 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wide">
              Pago Único
            </span>
            <h3 className="text-2xl font-bold text-gray-900 mt-4">Paquete Creador</h3>
            <p className="mt-2 text-gray-500">Perfecto para creadores independientes y pruebas de alto impacto.</p>
            <div className="mt-6 flex items-baseline">
              <span className="text-5xl font-extrabold text-gray-900">$9</span>
              <span className="ml-2 text-gray-500">USD</span>
            </div>
            <ul className="mt-8 space-y-4 text-gray-600">
              <li className="flex items-center">✅ 100 Créditos de IA acreditados</li>
              <li className="flex items-center">✅ Formatos Vertical (9:16) y Horizontal (16:9)</li>
              <li className="flex items-center">✅ Acceso permanente sin caducidad</li>
            </ul>
          </div>
          <button
            onClick={() => handleCheckout('Creador')}
            disabled={loadingPlan === 'Creador'}
            className="mt-10 w-full bg-blue-600 text-white py-3.5 px-4 rounded-xl font-semibold hover:bg-blue-700 transition shadow-sm"
          >
            {loadingPlan === 'Creador' ? 'Redirigindo a PayPal...' : 'Pagar con PayPal ($9)'}
          </button>
        </div>

        {/* Plan Pro */}
        <div className="bg-white border-2 border-blue-600 rounded-3xl shadow-xl p-8 flex flex-col justify-between relative">
          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs uppercase tracking-wider font-bold py-1.5 px-4 rounded-full shadow-sm">
            Más Popular 🚀
          </div>
          <div>
            <span className="inline-block bg-indigo-50 text-indigo-600 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wide">
              Pago Mensual
            </span>
            <h3 className="text-2xl font-bold text-gray-900 mt-4">Plan Pro Ilimitado</h3>
            <p className="mt-2 text-gray-500">Para agencias, marcas y creadores con alto volumen diario de contenido.</p>
            <div className="mt-6 flex items-baseline">
              <span className="text-5xl font-extrabold text-gray-900">$29</span>
              <span className="ml-2 text-gray-500">/ mes</span>
            </div>
            <ul className="mt-8 space-y-4 text-gray-600">
              <li className="flex items-center">✅ 500 Créditos renovados cada mes</li>
              <li className="flex items-center">✅ Prioridad máxima en servidores de IA</li>
              <li className="flex items-center">✅ Soporte técnico prioritario 24/7</li>
            </ul>
          </div>
          <button
            onClick={() => handleCheckout('Pro')}
            disabled={loadingPlan === 'Pro'}
            className="mt-10 w-full bg-gray-900 text-white py-3.5 px-4 rounded-xl font-semibold hover:bg-gray-800 transition shadow-sm"
          >
            {loadingPlan === 'Pro' ? 'Redirigindo a PayPal...' : 'Suscribirse con PayPal ($29)'}
          </button>
        </div>
      </div>
    </div>
  );
}