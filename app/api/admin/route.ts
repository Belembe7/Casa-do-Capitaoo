import { NextResponse } from 'next/server';
import { readJsonFile } from '@/lib/db';

export async function POST(request: Request) {
  const { email, password } = await request.json();
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@casadocapitao.co.mz';
  const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';

  if (email === adminEmail && password === adminPassword) {
    return NextResponse.json({ success: true, token: 'admin-session-token' });
  }

  return NextResponse.json({ error: 'Credenciais inválidas' }, { status: 401 });
}

export async function GET() {
  const bookings = await readJsonFile('bookings.json', []);
  const notifications = await readJsonFile('notifications.json', []);

  const totalBookings = bookings.length;
  const confirmedBookings = bookings.filter((b: { status: string }) => b.status === 'confirmed' || b.status === 'paid').length;
  const cancelledBookings = bookings.filter((b: { status: string }) => b.status === 'cancelled').length;
  const revenue = bookings
    .filter((b: { status: string }) => b.status !== 'cancelled')
    .reduce((sum: number, b: { totalAmount: number }) => sum + b.totalAmount, 0);

  return NextResponse.json({
    stats: {
      totalBookings,
      confirmedBookings,
      cancelledBookings,
      revenue,
      occupancyRate: totalBookings > 0 ? Math.round((confirmedBookings / totalBookings) * 100) : 0,
      unreadNotifications: notifications.filter((n: { read: boolean }) => !n.read).length,
      pendingBookings: bookings.filter((b: { status: string }) => b.status === 'pending').length,
    },
    recentBookings: bookings.slice(-5).reverse(),
    notifications: notifications.slice(-10).reverse(),
  });
}
