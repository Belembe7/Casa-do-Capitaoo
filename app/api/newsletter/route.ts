import { NextResponse } from 'next/server';
import { readJsonFile, writeJsonFile, type NewsletterSubscriber } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email?.trim()) {
      return NextResponse.json(
        { error: 'Email é obrigatório.', hint: 'Introduza o seu endereço de email para subscrever.' },
        { status: 400 }
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: 'Email inválido.', hint: 'Verifique se escreveu correctamente, ex.: oseunome@email.com' },
        { status: 400 }
      );
    }

    const subscribers = await readJsonFile<NewsletterSubscriber[]>('newsletter.json', []);
    if (subscribers.some((s) => s.email.toLowerCase() === email.trim().toLowerCase())) {
      return NextResponse.json(
        {
          error: 'Este email já está subscrito.',
          hint: 'Se não recebe os nossos emails, verifique a pasta de spam ou contacte-nos.',
        },
        { status: 400 }
      );
    }

    subscribers.push({ email: email.trim().toLowerCase(), subscribedAt: new Date().toISOString() });
    await writeJsonFile('newsletter.json', subscribers);

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      {
        error: 'Erro ao subscrever.',
        hint: 'Tente novamente ou contacte info@casadocapitao.co.mz para assistência.',
      },
      { status: 500 }
    );
  }
}
