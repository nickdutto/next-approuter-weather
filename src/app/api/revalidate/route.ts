import { revalidatePath } from 'next/cache';
import { z, ZodError } from 'zod';

export async function POST(request: Request) {
  try {
    const apiKey = request.headers.get('X-API-Key');
    const secretKey = process.env.SECRET_KEY;

    if (!apiKey || apiKey !== secretKey) {
      return new Response('Unauthorized', { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const type = z
      .string()
      .min(1)
      .parse(searchParams.get('type'), { path: ['type'] });

    if (type === 'weather') {
      console.log('Revalidating path (page) - /');
      revalidatePath('/', 'page');

      return new Response('OK - Revalidated path (page) - /', { status: 200 });
    } else if (type === 'water') {
      console.log('Revalidating path (layout) - /water');
      revalidatePath('/water', 'layout');

      return new Response('OK - Revalidated path (layout) - /water', {
        status: 200,
      });
    } else {
      return new Response('Bad Request - type must be weather or water', {
        status: 400,
      });
    }
  } catch (error) {
    if (error instanceof ZodError) {
      return new Response(error.message, { status: 400 });
    }

    return new Response('Bad Request', {
      status: 400,
    });
  }
}
