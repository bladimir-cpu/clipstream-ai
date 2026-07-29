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
      return NextResponse.json({ 
        success: false, 
        error: 'Has agotado tus créditos gratuitos.' 
      }, { status: 403 });
    }

    const webhookUrl = process.env.MAKE_WEBHOOK_URL;

    if (!webhookUrl) {
      return NextResponse.json({ success: false, error: 'Falta configurar la URL del Webhook' }, { status: 500 });
    }

    // Le enviamos a Make tanto el "type" (texto, youtube, imagen) como el "content"
    const makeResponse = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ type, content }),
    });

    // Si Make rechaza la petición, capturamos el motivo exacto
    if (!makeResponse.ok) {
      const errorText = await makeResponse.text();
      throw new Error(`Make rechazó la conexión (Status ${makeResponse.status}): ${errorText}`);
    }

    const remainingCredits = currentCredits - 1;

    return NextResponse.json({
      success: true,
      message: '¡Datos atrapados por Make con éxito!',
      remainingCredits: remainingCredits,
    });

  } catch (error: any) {
    console.error(error);
    // Ahora sí mostraremos el error real en la pantalla para cazar el problema
    return NextResponse.json({ success: false, error: `Fallo de conexión: ${error.message}` }, { status: 500 });
  }
}
