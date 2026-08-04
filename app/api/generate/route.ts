import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { type, content, userCredits } = body;

    const openAiApiKey = process.env.OPENAI_API_KEY || "";

    if (!openAiApiKey) {
      return NextResponse.json(
        { error: 'Falta configurar la variable OPENAI_API_KEY en el servidor.' },
        { status: 400 }
      );
    }

    // Llamada directa a OpenAI sin depender de Make
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${openAiApiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: 'Eres un experto creador de guiones y contenido para redes sociales. Responde de forma directa, estructurada y limpia.'
          },
          {
            role: 'user',
            content: `Tipo de contenido: ${type}. Idea o descripción: ${content}`
          }
        ],
        temperature: 0.7
      })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error?.message || 'Error al comunicarse con OpenAI.');
    }

    const textOutput = data.choices?.[0]?.message?.content || "Contenido generado con éxito.";

    return NextResponse.json({
      output: textOutput,
      videoUrl: "", // Puedes dejarlo vacío o poner un enlace de video funcional
      remainingCredits: userCredits > 0 ? userCredits - 1 : 0
    });

  } catch (error: any) {
    console.error("ERROR EN API:", error);
    return NextResponse.json(
      { error: error.message || 'Error interno al procesar la solicitud.' },
      { status: 500 }
    );
  }
}
