"use client";

import { useState } from "react";
import { Video, Smartphone, MonitorPlay, Loader2, Coins } from "lucide-react";

export default function CreateVideoPage() {
  const [prompt, setPrompt] = useState("");
  const [format, setFormat] = useState("vertical");
  const [isGenerating, setIsGenerating] = useState(false);
  const [credits, setCredits] = useState(30);

  const handleGenerate = async () => {
    if (!prompt) return;
    setIsGenerating(true);
    
    // Aquí conectaremos la IA en el futuro, por ahora simulamos la carga
    setTimeout(() => {
      setIsGenerating(false);
      setCredits(credits - 1);
      alert("¡Video generado con éxito! (Simulación)");
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-12">
      <div className="max-w-3xl mx-auto space-y-8">
        
        {/* Encabezado con Créditos */}
        <div className="flex justify-between items-center bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <h1 className="text-xl md:text-2xl font-bold text-gray-800 flex items-center gap-2">
            <Video className="text-blue-600" />
            ClipStream AI
          </h1>
          <div className="flex items-center gap-2 bg-blue-50 text-blue-700 px-3 py-1.5 md:px-4 md:py-2 rounded-full font-semibold text-sm md:text-base">
            <Coins size={18} />
            <span>{credits} Créditos</span>
          </div>
        </div>

        {/* Área de Trabajo Principal */}
        <div className="bg-white p-6 md:p-8 rounded-xl shadow-sm border border-gray-100 space-y-6">
          
          {/* Caja de Texto para el Prompt */}
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-gray-700">
              ¿De qué trata tu video? Escribe el guion o la idea principal
            </label>
            <textarea
              className="w-full h-40 p-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none text-gray-700"
              placeholder="Ejemplo: Crea un video sobre los 3 beneficios de usar inteligencia artificial en el marketing..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            ></textarea>
          </div>

          {/* Selector de Formato */}
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-gray-700">
              Formato del Video
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button
                onClick={() => setFormat("vertical")}
                className={`flex flex-col items-center justify-center p-4 rounded-lg border-2 transition-all ${
                  format === "vertical"
                    ? "border-blue-600 bg-blue-50 text-blue-700"
                    : "border-gray-200 hover:border-blue-300 text-gray-500"
                }`}
              >
                <Smartphone size={32} className="mb-2" />
                <span className="font-semibold">Vertical (9:16)</span>
                <span className="text-xs mt-1 text-center">TikTok, Reels, Shorts</span>
              </button>

              <button
                onClick={() => setFormat("horizontal")}
                className={`flex flex-col items-center justify-center p-4 rounded-lg border-2 transition-all ${
                  format === "horizontal"
                    ? "border-blue-600 bg-blue-50 text-blue-700"
                    : "border-gray-200 hover:border-blue-300 text-gray-500"
                }`}
              >
                <MonitorPlay size={32} className="mb-2" />
                <span className="font-semibold">Horizontal (16:9)</span>
                <span className="text-xs mt-1 text-center">YouTube, VSL, Web</span>
              </button>
            </div>
          </div>

          {/* Botón Generar */}
          <button
            onClick={handleGenerate}
            disabled={isGenerating || !prompt}
            className={`w-full py-4 rounded-lg text-lg font-bold text-white flex items-center justify-center gap-2 transition-all shadow-lg ${
              isGenerating || !prompt
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 hover:shadow-blue-500/30"
            }`}
          >
            {isGenerating ? (
              <>
                <Loader2 className="animate-spin" size={24} />
                Generando Video con IA...
              </>
            ) : (
              <>
                Generar Video
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}