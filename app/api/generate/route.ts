import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { type, content, userCredits } = body;

    const makeWebhookUrl = process.env.MAKE_WEBHOOK_URL || "";

    if (!makeWebhookUrl) {
      return NextResponse.json(
        { error: 'Falta configurar la variable MAKE_WEBHOOK_URL en Vercel.' },
        { status: 400 }
      );
    }

    const makeResponse = await fetch(makeWebhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type, content }),
    });

    if (!makeResponse.ok) {
      throw new Error(`Error en el Webhook de Make (Código: ${makeResponse.status})`);
    }

    const makeData = await makeResponse.json().catch(() => ({}));

    const textOutput = makeData.output || makeData.message || makeData.text || "Contenido generado con éxito.";
    const dynamicVideoUrl = makeData.videoUrl || "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";

    return NextResponse.json({
      output: textOutput,
      videoUrl: dynamicVideoUrl,
      remainingCredits: userCredits > 0 ? userCredits - 1 : 0
    });

  } catch (error: any) {
    console.error("API ROUTE ERROR:", error);
    return NextResponse.json(
      { error: error.message || 'Error interno al procesar la solicitud con Make.' },
      { status: 500 }
    );
  }
}
