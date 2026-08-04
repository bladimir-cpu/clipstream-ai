'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function SuccessPage() {
  const router = useRouter();
  const [status, setStatus] = useState('Verificando tu pago y activando créditos...');

  useEffect(() => {
    // Aquí simulamos la acreditación automática en la sesión/base de datos
    const timer = setTimeout(() => {
      setStatus('¡Pago verificado con éxito! Tus créditos han sido acreditados 🎉');
      
      // Opcional: sumamos créditos temporalmente en localStorage para la prueba visual
      if (typeof window !== 'undefined') {
        const currentCredits = parseInt(localStorage.getItem('clipstream_credits') || '30');
        localStorage.setItem('clipstream_credits', (currentCredits + 150).toString());
      }

      // Redirigir al panel de creación tras 3 segundos
      setTimeout(() => {
        router.push('/dashboard/create');
      }, 2500);
    }, 1500);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center py-12 px-4 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-600/15 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-md w-full bg-slate-900/85 backdrop-blur-xl border border-slate-800 rounded-3xl p-8 shadow-2xl text-center relative z-10">
        <div className="w-16 h-16 bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl">
          ✓
        </div>
        
        <h1 className="text-2xl font-extrabold text-white mb-2">¡Gracias por tu compra!</h1>
        <p className="text-sm text-slate-300 mb-6">{status}</p>

        <div className="animate-pulse flex justify-center items-center gap-2 text-purple-400 text-sm font-semibold">
          <span>Redirigiendo a tu estudio...</span>
        </div>

        <div className="mt-8">
          <Link href="/dashboard/create" className="text-xs text-slate-400 hover:text-white transition underline">
            Ir al panel manualmente
          </Link>
        </div>
      </div>
    </div>
  );
}
