import { NextResponse } from 'next/server';
import { readJsonFile, writeJsonFile, type Booking, type Notification } from '@/lib/db';
import { generateBookingNumber, calculateNights } from '@/lib/utils';
import { getRoomBySlug } from '@/lib/data/rooms';
import { v4 as uuidv4 } from 'uuid';

export async function GET() {
  const bookings = await readJsonFile<Booking[]>('bookings.json', []);
  return NextResponse.json({ bookings });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const room = getRoomBySlug(body.roomSlug);
    if (!room) {
      return NextResponse.json({ error: 'Quarto não encontrado' }, { status: 404 });
    }

    const nights = calculateNights(body.checkIn, body.checkOut);
    const totalAmount = room.pricePerNight * nights * (body.roomCount || 1);
    const bookingNumber = generateBookingNumber();

    const booking: Booking = {
      id: uuidv4(),
      bookingNumber,
      name: body.name,
      email: body.email,
      phone: body.phone,
      roomSlug: room.slug,
      roomName: room.name,
      checkIn: body.checkIn,
      checkOut: body.checkOut,
      guests: body.guests,
      roomCount: body.roomCount || 1,
      totalAmount,
      paymentMethod: body.paymentMethod,
      status: 'pending',
      specialRequests: body.specialRequests,
      createdAt: new Date().toISOString(),
    };

    const bookings = await readJsonFile<Booking[]>('bookings.json', []);
    bookings.push(booking);
    await writeJsonFile('bookings.json', bookings);

    const notifications = await readJsonFile<Notification[]>('notifications.json', []);
    notifications.push({
      id: uuidv4(),
      type: 'booking',
      message: `Nova reserva ${bookingNumber} — ${room.name} por ${body.name}`,
      read: false,
      createdAt: new Date().toISOString(),
    });
    await writeJsonFile('notifications.json', notifications);

    // Email simulation (log to console in dev)
    console.log(`[EMAIL] Confirmação enviada para ${body.email}: Reserva ${bookingNumber}`);

    return NextResponse.json({ bookingNumber, booking });
  } catch {
    return NextResponse.json({ error: 'Erro ao criar reserva' }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const { bookingNumber, status } = await request.json();
    const bookings = await readJsonFile<Booking[]>('bookings.json', []);
    const index = bookings.findIndex((b) => b.bookingNumber === bookingNumber);
    if (index === -1) {
      return NextResponse.json({ error: 'Reserva não encontrada' }, { status: 404 });
    }
    bookings[index].status = status;
    await writeJsonFile('bookings.json', bookings);
    return NextResponse.json({ booking: bookings[index] });
  } catch {
    return NextResponse.json({ error: 'Erro ao atualizar reserva' }, { status: 500 });
  }
}
