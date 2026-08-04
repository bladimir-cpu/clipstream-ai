import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { type, content, userCredits } = body;

    const makeWebhookUrl = process.env.MAKE_WEBHOOK_URL || "";

    if (!makeWebhookUrl) {
      return NextResponse.json(
        { error: 'Falta configurar la variable MAKE_WEBHOOK_URL en el servidor.' },
        { status: 400 }
      );
    }

    const makeResponse = await fetch(makeWebhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type, content }),
    });

    // Leemos la respuesta de Make como texto plano primero para ver qué trae
    const rawTextResponse = await makeResponse.text();
    console.log("RESPUESTA CRUDA DE MAKE:", rawTextResponse);

    let makeData: any = {};
    try {
      makeData = JSON.parse(rawTextResponse);
    } catch (e) {
      makeData = { output: rawTextResponse };
    }

    const textOutput = makeData.output || makeData.message || makeData.text || rawTextResponse || "Contenido generado con éxito.";
    const dynamicVideoUrl = makeData.videoUrl || makeData.url || "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";

    return NextResponse.json({
      output: textOutput,
      videoUrl: dynamicVideoUrl,
      remainingCredits: userCredits > 0 ? userCredits - 1 : 0
    });

  } catch (error: any) {
    console.error("ERROR EN API:", error);
    return NextResponse.json(
      { error: error.message || 'Error interno al procesar la solicitud con Make.' },
      { status: 500 }
    );
  }
}
