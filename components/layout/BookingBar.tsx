'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Users, X } from 'lucide-react';
import { useI18n } from '@/lib/i18n/context';

export default function BookingBar() {
  const { t } = useI18n();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(2);
  const [rooms, setRooms] = useState(1);

  const handleBook = () => {
    const params = new URLSearchParams();
    if (checkIn) params.set('checkIn', checkIn);
    if (checkOut) params.set('checkOut', checkOut);
    params.set('guests', guests.toString());
    params.set('rooms', rooms.toString());
    router.push(`/reservar?${params.toString()}`);
    setMobileOpen(false);
  };

  const today = new Date().toISOString().split('T')[0];

  const BookingFields = () => (
    <>
      <div className="flex flex-col">
        <label className="text-[10px] uppercase tracking-widest text-text-light mb-1 flex items-center gap-1">
          <Calendar size={12} />
          {t.booking.checkIn}
        </label>
        <input
          type="date"
          value={checkIn}
          min={today}
          onChange={(e) => setCheckIn(e.target.value)}
          className="bg-transparent border-b border-gray-300 py-2 text-sm focus:outline-none focus:border-secondary"
        />
      </div>
      <div className="flex flex-col">
        <label className="text-[10px] uppercase tracking-widest text-text-light mb-1 flex items-center gap-1">
          <Calendar size={12} />
          {t.booking.checkOut}
        </label>
        <input
          type="date"
          value={checkOut}
          min={checkIn || today}
          onChange={(e) => setCheckOut(e.target.value)}
          className="bg-transparent border-b border-gray-300 py-2 text-sm focus:outline-none focus:border-secondary"
        />
      </div>
      <div className="flex flex-col">
        <label className="text-[10px] uppercase tracking-widest text-text-light mb-1 flex items-center gap-1">
          <Users size={12} />
          {t.booking.guests}
        </label>
        <select
          value={guests}
          onChange={(e) => setGuests(Number(e.target.value))}
          className="bg-transparent border-b border-gray-300 py-2 text-sm focus:outline-none focus:border-secondary"
        >
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <option key={n} value={n}>
              {n} {t.booking.adults}
            </option>
          ))}
        </select>
      </div>
      <button onClick={handleBook} className="btn-primary whitespace-nowrap">
        {t.booking.book}
      </button>
    </>
  );

  return (
    <>
      {/* Desktop booking bar */}
      <div className="hidden md:block fixed bottom-0 left-0 right-0 z-40 bg-white booking-bar-shadow">
        <div className="section-padding py-4">
          <div className="flex items-end gap-6 max-w-4xl mx-auto">
            <BookingFields />
          </div>
        </div>
      </div>

      {/* Mobile booking button */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 p-4">
        <button
          onClick={() => setMobileOpen(true)}
          className="btn-primary w-full shadow-lg"
        >
          {t.booking.book}
        </button>
      </div>

      {/* Mobile sheet */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/50 md:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed bottom-0 left-0 right-0 z-50 bg-white p-6 rounded-t-2xl md:hidden"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-display text-xl">{t.booking.book}</h3>
                <button onClick={() => setMobileOpen(false)}>
                  <X size={20} />
                </button>
              </div>
              <div className="space-y-4">
                <BookingFields />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
