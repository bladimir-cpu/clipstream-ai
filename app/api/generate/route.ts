import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { type, content } = body;

    if (!content) {
      return NextResponse.json({ success: false, error: 'Contenido requerido' }, { status: 400 });
    }

    // Simulamos el tiempo de procesamiento de la IA
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const mockClips = [
      { id: 1, title: 'Momento Clave #1 (Viral Hook)', duration: '45s', url: '#' },
      { id: 2, title: 'Extracto de Alto Impacto #2', duration: '30s', url: '#' },
      { id: 3, title: 'Conclusión y Llamado a la Acción', duration: '55s', url: '#' },
    ];

    return NextResponse.json({
      success: true,
      message: '¡Videos generados con éxito por la IA!',
      clips: mockClips,
    });

  } catch (error) {
    return NextResponse.json({ success: false, error: 'Error interno en el servidor de IA' }, { status: 500 });
  }
}
