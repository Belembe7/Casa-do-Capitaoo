import { NextResponse } from 'next/server';
import { readJsonFile } from '@/lib/db';

export async function GET() {
  const contacts = await readJsonFile<Array<{
    id: string; name: string; email: string; subject: string; message: string; createdAt: string;
  }>>('contacts.json', []);

  return NextResponse.json(contacts.map((c) => ({
    id: c.id,
    name: c.name,
    email: c.email,
    phone: null,
    subject: c.subject,
    message: c.message,
    status: 'unread',
    replied_at: null,
    created_at: c.createdAt,
  })));
}
