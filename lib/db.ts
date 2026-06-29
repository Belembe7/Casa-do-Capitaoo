import { promises as fs } from 'fs';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'data');

async function ensureDataDir() {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
  } catch {
    // directory exists
  }
}

export async function readJsonFile<T>(filename: string, defaultValue: T): Promise<T> {
  await ensureDataDir();
  const filePath = path.join(DATA_DIR, filename);
  try {
    const content = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(content);
  } catch {
    return defaultValue;
  }
}

export async function writeJsonFile<T>(filename: string, data: T): Promise<void> {
  await ensureDataDir();
  const filePath = path.join(DATA_DIR, filename);
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8');
}

export interface Booking {
  id: string;
  bookingNumber: string;
  name: string;
  email: string;
  phone: string;
  roomSlug: string;
  roomName: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  roomCount: number;
  totalAmount: number;
  paymentMethod: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'paid';
  specialRequests?: string;
  createdAt: string;
}

export interface NewsletterSubscriber {
  email: string;
  subscribedAt: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
}

export interface Notification {
  id: string;
  type: 'booking' | 'cancellation' | 'payment' | 'contact';
  message: string;
  read: boolean;
  createdAt: string;
}
