'use client';

import Link from 'next/link';

export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white shadow-lg rounded-3xl p-8 text-center border border-gray-100">
        <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 text-green-600 text-3xl mb-6">
          🎉
        </div>
        <h2 className="text-3xl font-extrabold text-gray-900">¡Pago Exitoso!</h2>
        <p className="mt-4 text-gray-600">
          Muchas gracias por tu compra en <span className="font-semibold text-gray-900">ClipStream AI</span>. Tus créditos han sido acreditados correctamente.
        </p>
        <div className="mt-8 space-y-3">
          <Link
            href="/dashboard/create"
            className="w-full inline-block bg-blue-600 text-white py-3.5 px-4 rounded-xl font-semibold hover:bg-blue-700 transition shadow-sm"
          >
            Ir al Generador de Videos
          </Link>
          <Link
            href="/pricing"
            className="w-full inline-block bg-gray-100 text-gray-700 py-3.5 px-4 rounded-xl font-semibold hover:bg-gray-200 transition"
          >
            Ver Planes y Precios
          </Link>
        </div>
      </div>
    </div>
  );
}