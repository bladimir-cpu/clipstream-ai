import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { prompt, tab } = body;

    const apiKey = process.env.KLING_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: 'Falta configurar la KLING_API_KEY en las variables de entorno.' },
        { status: 400 }
      );
    }

    // 1. Petición para crear la tarea de generación de video en Kling AI
    const response = await fetch('https://api.klingai.com/v1/videos/text2video', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        prompt: prompt || 'Crear clip viral optimizado para redes sociales',
        model_name: 'kling-v1',
        duration: '5',
        aspect_ratio: '9:16',
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Error al comunicarse con Kling AI. Verifica tus fondos o saldo API.');
    }

    // Devolvemos el resultado real de la API
    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    console.error('Error al conectar con Kling AI:', error);
    return NextResponse.json({ error: error.message || 'Error interno del servidor' }, { status: 500 });
  }
}
