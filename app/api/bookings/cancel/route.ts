import { NextResponse } from 'next/server';
import { readJsonFile, writeJsonFile, type Booking, type Notification } from '@/lib/db';
import { v4 as uuidv4 } from 'uuid';

export async function POST(request: Request) {
  try {
    const { bookingNumber } = await request.json();

    if (!bookingNumber?.trim()) {
      return NextResponse.json(
        {
          error: 'Número de reserva em falta.',
          hint: 'Introduza o código que recebeu no email de confirmação (ex.: CC-XXXXX-XXXX).',
        },
        { status: 400 }
      );
    }

    const bookings = await readJsonFile<Booking[]>('bookings.json', []);
    const index = bookings.findIndex((b) => b.bookingNumber === bookingNumber.trim());

    if (index === -1) {
      return NextResponse.json(
        {
          error: 'Reserva não encontrada.',
          hint: 'Verifique se copiou correctamente o número do email de confirmação. Contacte-nos se precisar de ajuda.',
        },
        { status: 404 }
      );
    }

    const booking = bookings[index];

    if (booking.status === 'cancelled') {
      return NextResponse.json(
        {
          error: 'Esta reserva já foi cancelada.',
          hint: 'Se acredita que isto é um erro, contacte a recepção do hotel.',
        },
        { status: 400 }
      );
    }

    const checkIn = new Date(booking.checkIn);
    const now = new Date();
    const hoursUntilCheckIn = (checkIn.getTime() - now.getTime()) / (1000 * 60 * 60);

    if (hoursUntilCheckIn < 48) {
      return NextResponse.json(
        {
          error: 'Cancelamento não permitido com menos de 48h de antecedência.',
          hint: 'Para situações urgentes, ligue para o hotel ou envie mensagem pelo WhatsApp.',
        },
        { status: 400 }
      );
    }

    bookings[index].status = 'cancelled';
    await writeJsonFile('bookings.json', bookings);

    const notifications = await readJsonFile<Notification[]>('notifications.json', []);
    notifications.push({
      id: uuidv4(),
      type: 'cancellation',
      message: `Reserva ${bookingNumber} cancelada por ${booking.name}`,
      read: false,
      createdAt: new Date().toISOString(),
    });
    await writeJsonFile('notifications.json', notifications);

    console.log(`[EMAIL] Cancelamento enviado para ${booking.email}: Reserva ${bookingNumber}`);

    return NextResponse.json({ success: true, booking: bookings[index] });
  } catch {
    return NextResponse.json(
      {
        error: 'Erro ao cancelar a reserva.',
        hint: 'Tente novamente ou contacte-nos directamente por telefone ou email.',
      },
      { status: 500 }
    );
  }
}
