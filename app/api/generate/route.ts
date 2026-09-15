import { NextResponse } from 'next/server';
import { createKlingVideoTask } from '@/app/lib/kling';

export const runtime = 'nodejs'; // jsonwebtoken necesita el runtime de Node, no Edge

export async function POST(request: Request) {
  try {
    const { prompt } = await request.json();

    if (!process.env.KLING_ACCESS_KEY || !process.env.KLING_SECRET_KEY) {
      return NextResponse.json(
        { error: 'Faltan KLING_ACCESS_KEY / KLING_SECRET_KEY en las variables de entorno.' },
        { status: 400 }
      );
    }

    const finalPrompt = prompt?.trim() || 'Crear clip viral optimizado para redes sociales';
    const task = await createKlingVideoTask({ prompt: finalPrompt });

    return NextResponse.json({ success: true, taskId: task.task_id, status: task.task_status });
  } catch (error: any) {
    console.error('Error al conectar con Kling AI:', error);
    return NextResponse.json({ error: error.message || 'Error interno del servidor' }, { status: 500 });
  }
}
