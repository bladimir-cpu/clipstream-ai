import { NextResponse } from 'next/server';
import { getKlingVideoTask } from '@/app/lib/kling';

export const runtime = 'nodejs';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const taskId = searchParams.get('taskId');

  if (!taskId) {
    return NextResponse.json({ error: 'Falta el parámetro taskId' }, { status: 400 });
  }

  try {
    const task = await getKlingVideoTask(taskId);
    return NextResponse.json({ success: true, ...task });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Error al consultar el estado' }, { status: 500 });
  }
}
