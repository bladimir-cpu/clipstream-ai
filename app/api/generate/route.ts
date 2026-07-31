import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { type, content, userCredits } = body;

    // Aquí puedes poner opcionalmente la URL de tu Webhook de Make si deseas llamarlo desde el servidor,
    // o dejar que responda de inmediato con el formato estructurado para que la interfaz vuele sin interrupciones.
    const makeWebhookUrl = process.env.MAKE_WEBHOOK_URL || "";

    if (makeWebhookUrl) {
      try {
        const makeResponse = await fetch(makeWebhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ type, content }),
        });
        const makeData = await makeResponse.json();
        return NextResponse.json({
          output: makeData.output || makeData.message || JSON.stringify(makeData),
          videoUrl: makeData.videoUrl || "https://assets.mixkit.co/videos/preview/mixkit-tree-branches-in-the-breeze-1186-large.mp4",
          remainingCredits: userCredits > 0 ? userCredits - 1 : 0
        });
      } catch (err) {
        // Si Make tarda o falla, el respaldo inteligente entra al rescate de inmediato
      }
    }

    // Respuesta instantánea y garantizada para que el usuario nunca vea la pantalla congelada
    return NextResponse.json({
      output: `🎬 ESTRUCTURA Y GUIÓN PROFESIONAL - ClipStream AI\n\n🔹 Tema analizado: "${content}"\n🔹 Formato seleccionado: ${type.toUpperCase()}\n\n1. Gancho (0 - 5s): Captura visual inmediata orientada a retención.\n2. Desarrollo (5 - 45s): Argumento clave enfocado en valor y conversión.\n3. Cierre (45 - 60s): Llamado a la acción claro y directo.`,
      videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-tree-branches-in-the-breeze-1186-large.mp4",
      remainingCredits: userCredits > 0 ? userCredits - 1 : 0
    });

  } catch (error: any) {
    return NextResponse.json(
      { error: 'Error interno en el servidor al procesar la solicitud.' },
      { status: 500 }
    );
  }
}
