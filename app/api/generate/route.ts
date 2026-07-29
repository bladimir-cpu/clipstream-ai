import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { content, userCredits } = body;

    if (!content) {
      return NextResponse.json({ success: false, error: 'Contenido requerido' }, { status: 400 });
    }

    const currentCredits = userCredits !== undefined ? userCredits : 30;

    if (currentCredits <= 0) {
      return NextResponse.json({ 
        success: false, 
        error: 'Has agotado tus 30 créditos gratuitos. ¡Adquiere un plan Pro o Agencia para continuar generando contenido viral ilimitado!' 
      }, { status: 403 });
    }

    // Obtenemos la URL del webhook desde las variables de entorno de Vercel
    const webhookUrl = process.env.MAKE_WEBHOOK_URL;

    if (!webhookUrl) {
      return NextResponse.json({ success: false, error: 'Falta configurar la URL del Webhook de Make en el servidor' }, { status: 500 });
    }

    // Enviamos los datos del usuario de forma segura desde el backend hacia Make (Adiós CORS)
    const makeResponse = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ content }),
    });

    if (!makeResponse.ok) {
      throw new Error('Error al comunicarse con el Webhook de Make');
    }

    const remainingCredits = currentCredits - 1;

    return NextResponse.json({
      success: true,
      message: '¡Solicitud enviada a Make con éxito!',
      remainingCredits: remainingCredits,
    });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: 'Error interno en el servidor de IA' }, { status: 500 });
  }
}
