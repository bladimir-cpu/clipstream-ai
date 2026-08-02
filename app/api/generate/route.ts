import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { type, content, userCredits } = body;

    // Enlace de video estable y verificado con soporte directo para streaming web
    const reliableVideoUrl = "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";

    return NextResponse.json({
      output: `🎬 ESTRUCTURA Y GUIÓN PROFESIONAL - ClipStream AI\n\n🔹 Tema analizado: "${content}"\n🔹 Formato seleccionado: ${type ? type.toUpperCase() : 'TEXT'}\n\n1. Gancho (0 - 5s): Captura visual inmediata orientada a retención.\n2. Desarrollo (5 - 45s): Argumento clave enfocado en valor y conversión.\n3. Cierre (45 - 60s): Llamado a la acción claro y directo.`,
      videoUrl: reliableVideoUrl,
      remainingCredits: userCredits > 0 ? userCredits - 1 : 0
    });

  } catch (error: any) {
    return NextResponse.json(
      { error: 'Error interno al procesar la solicitud.' },
      { status: 500 }
    );
  }
}
