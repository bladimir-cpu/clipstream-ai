{/* Reproductor de Video Profesional Corregido */}
            <div className="space-y-3 bg-gray-950 p-4 rounded-xl border border-purple-500/30">
              <p className="text-xs text-purple-300 font-semibold uppercase tracking-wider">🎥 VISTA PREVIA DEL VIDEO GENERADO:</p>
              
              <div className="relative w-full overflow-hidden rounded-xl border border-gray-800 bg-black shadow-2xl">
                <video 
                  key={result.videoUrl}
                  controls 
                  preload="auto"
                  playsInline
                  className="w-full max-h-[450px] mx-auto block"
                  ref={(videoNode) => {
                    if (videoNode) {
                      videoNode.load();
                    }
                  }}
                >
                  <source src={result.videoUrl} type="video/mp4" />
                  Tu navegador no soporta la reproducción de video.
                </video>
              </div>

              <div className="flex justify-end pt-2">
                <a 
                  href={result.videoUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  download="clipstream-viral-video.mp4"
                  className="px-5 py-2.5 bg-green-600 hover:bg-green-700 text-white font-bold text-xs rounded-xl transition shadow-lg flex items-center gap-2 cursor-pointer"
                >
                  📥 Descargar Video MP4
                </a>
              </div>
            </div>
