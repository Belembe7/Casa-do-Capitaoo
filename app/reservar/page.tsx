'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import Image from 'next/image';
import { rooms, getAvailableRooms } from '@/lib/data/rooms';
import { formatCurrency, calculateNights, generateBookingNumber } from '@/lib/utils';
import { notifyError, notifyInfo, notifySuccess, handleApiResponse, notifyValidation, FEEDBACK } from '@/lib/feedback';
import FormFeedback from '@/components/ui/FormFeedback';
import type { Room } from '@/lib/data/rooms';

interface BookingForm {
  name: string;
  email: string;
  phone: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  roomCount: number;
  roomSlug: string;
  paymentMethod: string;
  specialRequests?: string;
}

function ReservarContent() {
  const searchParams = useSearchParams();
  const [step, setStep] = useState(1);
  const [availableRooms, setAvailableRooms] = useState<Room[]>(rooms);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [bookingNumber, setBookingNumber] = useState('');
  const [filters, setFilters] = useState({
    checkIn: searchParams.get('checkIn') || '',
    checkOut: searchParams.get('checkOut') || '',
    guests: Number(searchParams.get('guests')) || 2,
    roomCount: Number(searchParams.get('rooms')) || 1,
    priceMax: 0,
    view: '',
    category: '',
  });

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { isSubmitting, errors },
  } = useForm<BookingForm>();

  const preselectedRoom = searchParams.get('room') || searchParams.get('suite') || searchParams.get('quarto');

  useEffect(() => {
    if (preselectedRoom) {
      const room = rooms.find((r) => r.slug.includes(preselectedRoom) || preselectedRoom.includes(r.slug));
      if (room) setSelectedRoom(room);
    }
  }, [preselectedRoom]);

  const searchAvailability = () => {
    if (!filters.checkIn || !filters.checkOut) {
      notifyError(FEEDBACK.booking.datesRequired, { hint: FEEDBACK.booking.datesHint });
      return;
    }
    if (filters.checkOut <= filters.checkIn) {
      notifyError('Check-out deve ser posterior ao check-in.', {
        hint: 'Seleccione uma data de saída depois da data de entrada.',
      });
      return;
    }
    let results = getAvailableRooms(filters.checkIn, filters.checkOut, filters.guests);
    if (filters.priceMax > 0) {
      results = results.filter((r) => r.pricePerNight <= filters.priceMax);
    }
    if (filters.view) {
      results = results.filter((r) => r.view.toLowerCase().includes(filters.view.toLowerCase()));
    }
    if (filters.category) {
      results = results.filter((r) => r.category.toLowerCase() === filters.category.toLowerCase());
    }
    setAvailableRooms(results);
    setStep(2);
    if (results.length === 0) {
      notifyInfo(FEEDBACK.booking.noRooms, { hint: FEEDBACK.booking.noRoomsHint });
    } else {
      notifySuccess(`${results.length} quarto(s) disponível(is)!`, {
        hint: 'Seleccione o quarto que preferir para continuar a reserva.',
      });
    }
  };

  const selectRoom = (room: Room) => {
    setSelectedRoom(room);
    setValue('roomSlug', room.slug);
    setValue('checkIn', filters.checkIn);
    setValue('checkOut', filters.checkOut);
    setValue('guests', filters.guests);
    setValue('roomCount', filters.roomCount);
    setStep(3);
  };

  const onSubmit = async (formData: BookingForm) => {
    const res = await fetch('/api/bookings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...formData, roomSlug: selectedRoom?.slug }),
    });
    const { ok, data } = await handleApiResponse<{ bookingNumber?: string }>(
      res,
      FEEDBACK.booking.success,
      'Guarde o número da reserva para consulta ou cancelamento.'
    );
    if (ok) {
      setBookingNumber(data.bookingNumber || '');
      setStep(4);
    }
  };

  const onInvalid = () => {
    notifyValidation(FEEDBACK.booking.fieldsRequired, FEEDBACK.booking.fieldsHint);
  };

  const nights = filters.checkIn && filters.checkOut
    ? calculateNights(filters.checkIn, filters.checkOut)
    : 0;
  const total = selectedRoom ? selectedRoom.pricePerNight * nights * filters.roomCount : 0;

  return (
    <section className="pt-32 pb-section section-padding max-w-4xl mx-auto">
      <h1 className="font-display text-4xl md:text-5xl mb-8">Reservar</h1>

      {/* Step indicators */}
      <div className="flex gap-4 mb-12 text-xs uppercase tracking-widest">
        {['Datas', 'Quarto', 'Dados', 'Confirmação'].map((label, i) => (
          <span
            key={label}
            className={step > i + 1 ? 'text-secondary' : step === i + 1 ? 'text-primary font-medium' : 'text-text-light'}
          >
            {i + 1}. {label}
          </span>
        ))}
      </div>

      {/* Step 1: Search */}
      {step === 1 && (
        <div className="space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs uppercase tracking-widest text-text-light">Check-in</label>
              <input
                type="date"
                value={filters.checkIn}
                onChange={(e) => setFilters({ ...filters, checkIn: e.target.value })}
                className="w-full border border-gray-300 px-4 py-3 mt-1 focus:outline-none focus:border-secondary"
              />
            </div>
            <div>
              <label className="text-xs uppercase tracking-widest text-text-light">Check-out</label>
              <input
                type="date"
                value={filters.checkOut}
                min={filters.checkIn}
                onChange={(e) => setFilters({ ...filters, checkOut: e.target.value })}
                className="w-full border border-gray-300 px-4 py-3 mt-1 focus:outline-none focus:border-secondary"
              />
            </div>
            <div>
              <label className="text-xs uppercase tracking-widest text-text-light">Hóspedes</label>
              <select
                value={filters.guests}
                onChange={(e) => setFilters({ ...filters, guests: Number(e.target.value) })}
                className="w-full border border-gray-300 px-4 py-3 mt-1 focus:outline-none focus:border-secondary"
              >
                {[1, 2, 3, 4, 5, 6].map((n) => (
                  <option key={n} value={n}>{n} adultos</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs uppercase tracking-widest text-text-light">Quartos</label>
              <select
                value={filters.roomCount}
                onChange={(e) => setFilters({ ...filters, roomCount: Number(e.target.value) })}
                className="w-full border border-gray-300 px-4 py-3 mt-1 focus:outline-none focus:border-secondary"
              >
                {[1, 2, 3].map((n) => (
                  <option key={n} value={n}>{n} quarto(s)</option>
                ))}
              </select>
            </div>
          </div>

          <details className="border border-gray-200 p-4">
            <summary className="text-sm uppercase tracking-widest cursor-pointer">Filtros avançados</summary>
            <div className="grid md:grid-cols-3 gap-4 mt-4">
              <div>
                <label className="text-xs text-text-light">Preço máximo/noite</label>
                <input
                  type="number"
                  value={filters.priceMax || ''}
                  onChange={(e) => setFilters({ ...filters, priceMax: Number(e.target.value) })}
                  className="w-full border border-gray-300 px-4 py-2 mt-1"
                  placeholder="Ex: 15000"
                />
              </div>
              <div>
                <label className="text-xs text-text-light">Vista</label>
                <select
                  value={filters.view}
                  onChange={(e) => setFilters({ ...filters, view: e.target.value })}
                  className="w-full border border-gray-300 px-4 py-2 mt-1"
                >
                  <option value="">Todas</option>
                  <option value="Mar">Vista Mar</option>
                  <option value="Jardim">Vista Jardim</option>
                  <option value="Piscina">Vista Piscina</option>
                </select>
              </div>
              <div>
                <label className="text-xs text-text-light">Categoria</label>
                <select
                  value={filters.category}
                  onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                  className="w-full border border-gray-300 px-4 py-2 mt-1"
                >
                  <option value="">Todas</option>
                  <option value="Suite">Suite</option>
                  <option value="Premium">Premium</option>
                  <option value="Standard">Standard</option>
                  <option value="Família">Família</option>
                </select>
              </div>
            </div>
          </details>

          <button onClick={searchAvailability} className="btn-primary" disabled={!filters.checkIn || !filters.checkOut}>
            Pesquisar disponibilidade
          </button>
        </div>
      )}

      {/* Step 2: Select room */}
      {step === 2 && (
        <div className="space-y-6">
          <p className="text-text-light">
            {availableRooms.length} quarto(s) disponível(is) para {nights} noite(s)
          </p>
          {availableRooms.length === 0 ? (
            <p className="text-red-500">Nenhum quarto disponível para as datas selecionadas.</p>
          ) : (
            availableRooms.map((room) => (
              <div key={room.slug} className="flex flex-col md:flex-row gap-6 border border-gray-200 p-4 hover:border-secondary transition-colors">
                <div className="relative w-full md:w-48 aspect-[4/3] flex-shrink-0 overflow-hidden">
                  <Image src={room.images[0]} alt={room.name} fill className="object-cover" />
                </div>
                <div className="flex-1">
                  <h3 className="font-display text-xl">{room.name}</h3>
                  <p className="text-sm text-text-light mt-1">{room.shortDescription}</p>
                  <p className="text-sm mt-2">{room.size}m² · {room.view} · {room.capacity} pessoas</p>
                  <p className="font-medium mt-2">
                    {formatCurrency(room.pricePerNight)}/noite
                    {nights > 0 && (
                      <span className="text-text-light font-normal">
                        {' '}· Total: {formatCurrency(room.pricePerNight * nights)}
                      </span>
                    )}
                  </p>
                </div>
                <button onClick={() => { selectRoom(room); notifyInfo(`Quarto "${room.name}" seleccionado`, { hint: 'Preencha os seus dados para concluir a reserva.' }); }} className="btn-primary self-center">
                  Selecionar
                </button>
              </div>
            ))
          )}
          <button onClick={() => setStep(1)} className="btn-ghost">← Alterar datas</button>
        </div>
      )}

      {/* Step 3: Guest details + payment */}
      {step === 3 && selectedRoom && (
        <form onSubmit={handleSubmit(onSubmit, onInvalid)} className="space-y-6" noValidate>
          <div className="bg-gray-50 p-6 mb-6">
            <h3 className="font-display text-xl">{selectedRoom.name}</h3>
            <p className="text-sm text-text-light mt-1">
              {filters.checkIn} → {filters.checkOut} · {nights} noite(s) · {filters.guests} hóspedes
            </p>
            <p className="font-medium mt-2 text-lg">Total: {formatCurrency(total)}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <input
                placeholder="Nome completo *"
                {...register('name', { required: 'Indique o seu nome completo.' })}
                className={`w-full border px-4 py-3 focus:outline-none focus:border-secondary ${errors.name ? 'border-red-400 bg-red-50/30' : 'border-gray-300'}`}
              />
              <FormFeedback message={errors.name?.message} />
            </div>
            <div>
              <input
                type="email"
                placeholder="Email *"
                {...register('email', {
                  required: 'Indique um email válido.',
                  pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Email inválido.' },
                })}
                className={`w-full border px-4 py-3 focus:outline-none focus:border-secondary ${errors.email ? 'border-red-400 bg-red-50/30' : 'border-gray-300'}`}
              />
              <FormFeedback message={errors.email?.message} hint="Usaremos este email para enviar a confirmação." />
            </div>
            <div className="md:col-span-2">
              <input
                placeholder="Telefone *"
                {...register('phone', {
                  required: 'Indique um telefone de contacto.',
                  minLength: { value: 9, message: 'Telefone demasiado curto.' },
                })}
                className={`w-full border px-4 py-3 focus:outline-none focus:border-secondary ${errors.phone ? 'border-red-400 bg-red-50/30' : 'border-gray-300'}`}
              />
              <FormFeedback message={errors.phone?.message} hint="Inclua código do país, ex.: +258 84 XXX XXXX" />
            </div>
          </div>

          <textarea placeholder="Pedidos especiais (opcional)" {...register('specialRequests')} rows={3} className="w-full border border-gray-300 px-4 py-3 resize-none focus:outline-none focus:border-secondary" />

          <div>
            <h3 className="text-sm uppercase tracking-widest mb-4">Método de pagamento *</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {['Visa', 'Mastercard', 'PayPal', 'M-Pesa', 'E-mola', 'Transferência'].map((method) => (
                <label key={method} className="flex items-center gap-2 border border-gray-300 p-3 cursor-pointer hover:border-secondary has-[:checked]:border-secondary has-[:checked]:bg-secondary/5">
                  <input type="radio" value={method} {...register('paymentMethod', { required: FEEDBACK.booking.paymentRequired })} />
                  <span className="text-sm">{method}</span>
                </label>
              ))}
            </div>
            <FormFeedback message={errors.paymentMethod?.message} hint={FEEDBACK.booking.paymentHint} />
          </div>

          <div className="flex gap-4">
            <button type="button" onClick={() => setStep(2)} className="btn-outline">← Voltar</button>
            <button type="submit" disabled={isSubmitting} className="btn-primary">
              {isSubmitting ? 'A processar...' : 'Confirmar reserva'}
            </button>
          </div>
        </form>
      )}

      {/* Step 4: Confirmation */}
      {step === 4 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-2xl text-green-600">✓</span>
          </div>
          <h2 className="font-display text-3xl mb-4">Reserva Confirmada!</h2>
          <p className="text-text-light mb-2">Número da reserva:</p>
          <p className="font-display text-2xl text-secondary mb-6">{bookingNumber}</p>
          <p className="text-text-light max-w-md mx-auto">
            Enviámos um email de confirmação para o seu endereço. Obrigado por escolher a Casa do Capitão!
          </p>
        </div>
      )}
    </section>
  );
}

export default function ReservarPage() {
  return (
    <Suspense fallback={<div className="pt-32 section-padding text-center">A carregar...</div>}>
      <ReservarContent />
    </Suspense>
  );
}
