import { NextResponse } from 'next/server';
import { readJsonFile } from '@/lib/db';

export async function GET() {
  const subs = await readJsonFile<Array<{ email: string; subscribedAt: string }>>('newsletter.json', []);
  return NextResponse.json(subs.map((s, i) => ({
    id: String(i),
    email: s.email,
    name: null,
    is_active: true,
    source: 'website',
    subscribed_at: s.subscribedAt,
  })));
}
