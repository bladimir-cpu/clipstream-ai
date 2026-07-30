'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/app/lib/supabase";
import { Video, Loader2, Lock, Mail } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (isSignUp) {
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) {
        alert(error.message);
      } else {
        alert("¡Registro exitoso! Ya puedes iniciar sesión.");
        setIsSignUp(false);
      }
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        alert("Correo o contraseña incorrectos");
      } else {
        router.push("/dashboard/create");
      }
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center items-center gap-2">
          <Video className="text-purple-500 h-10 w-10" />
          <h2 className="text-3xl font-extrabold text-white">ClipStream AI</h2>
        </div>
        <h2 className="mt-2 text-center text-sm text-gray-400">
          {isSignUp ? "Crea tu cuenta con 30 créditos gratis" : "Inicia sesión en tu cuenta"}
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-gray-900 py-8 px-4 shadow-xl sm:rounded-lg sm:px-10 border border-purple-500/30">
          <form className="space-y-6" onSubmit={handleAuth}>
            <div>
              <label className="block text-sm font-medium text-gray-300">Correo Electrónico</label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                  <Mail size={18} />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 block w-full px-3 py-2 border border-gray-700 bg-gray-950 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 sm:text-sm text-white"
                  placeholder="tucorreo@empresa.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300">Contraseña</label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                  <Lock size={18} />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 block w-full px-3 py-2 border border-gray-700 bg-gray-950 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 sm:text-sm text-white"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-lg text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none transition-all"
              >
                {loading ? <Loader2 className="animate-spin" size={20} /> : (isSignUp ? "Crear Cuenta (30 Créditos Gratis)" : "Iniciar Sesión")}
              </button>
            </div>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-sm text-purple-400 hover:text-purple-300 font-medium"
            >
              {isSignUp ? "¿Ya tienes una cuenta? Inicia sesión" : "¿No tienes cuenta? Regístrate gratis"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
