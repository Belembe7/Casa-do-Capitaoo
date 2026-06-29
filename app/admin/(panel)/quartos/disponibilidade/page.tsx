'use client';

import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import LoadingSkeleton from '@/components/admin/ui/LoadingSkeleton';
import { createClient, isSupabaseConfigured } from '@/lib/supabase/client';
import { getLocalRooms } from '@/lib/admin/local-data';
import toast from 'react-hot-toast';
import type { DbRoom, DbRoomAvailability, DbBooking } from '@/lib/supabase/types';
import {
  format, startOfMonth, endOfMonth, eachDayOfInterval, addMonths, subMonths, isSameMonth,
} from 'date-fns';
import { pt } from 'date-fns/locale';

export default function DisponibilidadePage() {
  const [month, setMonth] = useState(new Date());
  const [rooms, setRooms] = useState<DbRoom[]>([]);
  const [availability, setAvailability] = useState<DbRoomAvailability[]>([]);
  const [bookings, setBookings] = useState<DbBooking[]>([]);
  const [loading, setLoading] = useState(true);

  const days = eachDayOfInterval({ start: startOfMonth(month), end: endOfMonth(month) });

  useEffect(() => {
    async function load() {
      if (isSupabaseConfigured()) {
        const supabase = createClient();
        const start = format(startOfMonth(month), 'yyyy-MM-dd');
        const end = format(endOfMonth(month), 'yyyy-MM-dd');
        const [roomsRes, availRes, bookingsRes] = await Promise.all([
          supabase.from('rooms').select('*').eq('is_active', true).order('display_order'),
          supabase.from('room_availability').select('*').gte('date', start).lte('date', end),
          supabase.from('bookings').select('*').neq('status', 'cancelled').gte('check_in', start).lte('check_out', end),
        ]);
        setRooms((roomsRes.data || []) as DbRoom[]);
        setAvailability((availRes.data || []) as DbRoomAvailability[]);
        setBookings((bookingsRes.data || []) as DbBooking[]);
      } else {
        setRooms(getLocalRooms().filter((r) => r.is_active));
      }
      setLoading(false);
    }
    load();
  }, [month]);

  const getCellStatus = (roomId: string, date: Date): 'available' | 'booked' | 'blocked' => {
    const dateStr = format(date, 'yyyy-MM-dd');
    const avail = availability.find((a) => a.room_id === roomId && a.date === dateStr);
    if (avail && !avail.is_available) return 'blocked';

    const booked = bookings.some((b) =>
      b.room_id === roomId &&
      dateStr >= b.check_in &&
      dateStr < b.check_out
    );
    if (booked) return 'booked';
    return 'available';
  };

  const toggleBlock = async (roomId: string, date: Date) => {
    const dateStr = format(date, 'yyyy-MM-dd');
    const status = getCellStatus(roomId, date);
    if (status === 'booked') {
      toast.error('Data já reservada');
      return;
    }

    if (!isSupabaseConfigured()) {
      toast('Modo local — configure Supabase');
      return;
    }

    const supabase = createClient();
    const existing = availability.find((a) => a.room_id === roomId && a.date === dateStr);

    if (existing) {
      await supabase.from('room_availability').update({ is_available: !existing.is_available }).eq('id', existing.id);
    } else {
      await supabase.from('room_availability').insert({ room_id: roomId, date: dateStr, is_available: false, notes: 'Bloqueado manualmente' });
    }
    toast.success('Disponibilidade actualizada');
    setMonth(new Date(month));
  };

  const cellColors = {
    available: 'bg-emerald-100 hover:bg-emerald-200',
    booked: 'bg-red-100 cursor-not-allowed',
    blocked: 'bg-slate-300',
  };

  if (loading) return <LoadingSkeleton />;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Calendário de Disponibilidade</h2>
        <div className="flex items-center gap-2">
          <button type="button" onClick={() => setMonth(subMonths(month, 1))} className="p-2 hover:bg-slate-100 rounded">
            <ChevronLeft size={20} />
          </button>
          <span className="font-medium min-w-[140px] text-center capitalize">
            {format(month, 'MMMM yyyy', { locale: pt })}
          </span>
          <button type="button" onClick={() => setMonth(addMonths(month, 1))} className="p-2 hover:bg-slate-100 rounded">
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      <div className="flex gap-4 text-xs">
        <span className="flex items-center gap-1"><span className="w-3 h-3 bg-emerald-100 rounded" /> Disponível</span>
        <span className="flex items-center gap-1"><span className="w-3 h-3 bg-red-100 rounded" /> Reservado</span>
        <span className="flex items-center gap-1"><span className="w-3 h-3 bg-slate-300 rounded" /> Bloqueado</span>
      </div>

      <div className="admin-card overflow-x-auto">
        <table className="text-xs w-full min-w-[800px]">
          <thead>
            <tr>
              <th className="p-2 text-left sticky left-0 bg-white border-b">Quarto</th>
              {days.filter((_, i) => i % 2 === 0).map((day) => (
                <th key={day.toISOString()} className="p-1 text-center border-b min-w-[28px]">
                  {format(day, 'd')}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rooms.map((room) => (
              <tr key={room.id}>
                <td className="p-2 font-medium sticky left-0 bg-white border-b whitespace-nowrap">{room.name}</td>
                {days.filter((_, i) => i % 2 === 0).map((day) => {
                  const status = getCellStatus(room.id, day);
                  return (
                    <td key={day.toISOString()} className="p-0.5 border-b">
                      <button
                        type="button"
                        disabled={status === 'booked'}
                        onClick={() => toggleBlock(room.id, day)}
                        className={`w-full h-6 rounded ${cellColors[status]} ${!isSameMonth(day, month) ? 'opacity-30' : ''}`}
                        title={`${format(day, 'dd/MM')} — ${status}`}
                      />
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
