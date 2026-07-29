import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { type, content, userCredits } = body;

    if (!content) {
      return NextResponse.json({ success: false, error: 'Contenido requerido' }, { status: 400 });
    }

    const currentCredits = userCredits !== undefined ? userCredits : 30;

    if (currentCredits <= 0) {
      return NextResponse.json({ success: false, error: 'Créditos agotados' }, { status: 403 });
    }

    const webhookUrl = process.env.MAKE_WEBHOOK_URL;
    if (!webhookUrl) {
      return NextResponse.json({ success: false, error: 'Falta configurar webhook' }, { status: 500 });
    }

    // Enviamos una estructura clara con el prompt listo para OpenAI
    const makeResponse = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: type || 'text',
        prompt: content,
      }),
    });

    if (!makeResponse.ok) {
      const errorText = await makeResponse.text();
      throw new Error(`Make rechazó la conexión: ${errorText}`);
    }

    return NextResponse.json({
      success: true,
      message: '¡Enviado a Make con éxito!',
      remainingCredits: currentCredits - 1,
    });

  } catch (error: any) {
    return NextResponse.json({ success: false, error: `Fallo: ${error.message}` }, { status: 500 });
  }
}
