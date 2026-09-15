import jwt from 'jsonwebtoken';

const KLING_ACCESS_KEY = process.env.KLING_ACCESS_KEY!;
const KLING_SECRET_KEY = process.env.KLING_SECRET_KEY!;
const KLING_BASE_URL = 'https://api-singapore.klingai.com';

function getKlingToken() {
  const now = Math.floor(Date.now() / 1000);
  return jwt.sign(
    { iss: KLING_ACCESS_KEY, exp: now + 1800, nbf: now - 5 },
    KLING_SECRET_KEY,
    { algorithm: 'HS256', header: { alg: 'HS256', typ: 'JWT' } }
  );
}

export async function createKlingVideoTask(params: {
  prompt: string;
  model_name?: string;
  duration?: string;
  aspect_ratio?: string;
}) {
  const token = getKlingToken();
  const res = await fetch(`${KLING_BASE_URL}/v1/videos/text2video`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      model_name: params.model_name ?? 'kling-v2',
      prompt: params.prompt,
      duration: params.duration ?? '5',
      aspect_ratio: params.aspect_ratio ?? '9:16',
    }),
  });

  const data = await res.json();
  if (!res.ok || data.code !== 0) {
    throw new Error(data.message || 'Error al crear la tarea en Kling AI');
  }
  return data.data as { task_id: string; task_status: string };
}

export async function getKlingVideoTask(taskId: string) {
  const token = getKlingToken();
  const res = await fetch(`${KLING_BASE_URL}/v1/videos/text2video/${taskId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await res.json();
  if (!res.ok || data.code !== 0) {
    throw new Error(data.message || 'Error al consultar la tarea en Kling AI');
  }
  return data.data as {
    task_id: string;
    task_status: 'submitted' | 'processing' | 'succeed' | 'failed';
    task_status_msg?: string;
    task_result?: { videos: { id: string; url: string; duration: string }[] };
  };
}
