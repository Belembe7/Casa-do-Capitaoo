import { NextResponse } from 'next/server';
import { readJsonFile, writeJsonFile, type ContactMessage } from '@/lib/db';
import { v4 as uuidv4 } from 'uuid';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body.name?.trim()) {
      return NextResponse.json(
        { error: 'Nome é obrigatório.', hint: 'Indique o seu nome completo.' },
        { status: 400 }
      );
    }
    if (!body.email?.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) {
      return NextResponse.json(
        { error: 'Email inválido.', hint: 'Use um endereço válido, ex.: oseunome@email.com' },
        { status: 400 }
      );
    }
    if (!body.subject?.trim()) {
      return NextResponse.json(
        { error: 'Assunto é obrigatório.', hint: 'Indique brevemente o motivo do contacto.' },
        { status: 400 }
      );
    }
    if (!body.message?.trim() || body.message.trim().length < 10) {
      return NextResponse.json(
        { error: 'Mensagem demasiado curta.', hint: 'Escreva pelo menos 10 caracteres a descrever o seu pedido.' },
        { status: 400 }
      );
    }

    const message: ContactMessage = {
      id: uuidv4(),
      name: body.name.trim(),
      email: body.email.trim(),
      subject: body.subject.trim(),
      message: body.message.trim(),
      createdAt: new Date().toISOString(),
    };

    const messages = await readJsonFile<ContactMessage[]>('contacts.json', []);
    messages.push(message);
    await writeJsonFile('contacts.json', messages);

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      {
        error: 'Não foi possível enviar a mensagem.',
        hint: 'Tente novamente em alguns minutos ou contacte-nos por WhatsApp ou telefone.',
      },
      { status: 500 }
    );
  }
}
