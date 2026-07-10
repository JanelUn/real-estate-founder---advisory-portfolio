import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  CalendarCheck,
  CaretDown,
  CaretLeft,
  CaretRight,
  CheckCircle,
  WarningCircle,
  VideoCamera,
} from '@phosphor-icons/react';
import { motion } from 'motion/react';
import { Reveal } from './Reveal';
import { SERVICE_CATALOG } from '../../shared/services';

interface Slot {
  start: string;
  end: string;
}

interface AvailabilityResponse {
  weekStart: string;
  thisMonday: string;
  maxMonday: string;
  timezone: string;
  slots: Slot[];
}

interface BookingResult {
  meetLink: string | null;
  eventLink: string | null;
}

const DAY_LABELS = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie'];
const MAX_SLOTS_PER_DAY = 4;

function addDaysToISODate(dateStr: string, days: number): string {
  const date = new Date(`${dateStr}T00:00:00-05:00`);
  date.setUTCDate(date.getUTCDate() + days);
  return date.toISOString().slice(0, 10);
}

function formatWeekRange(weekStart: string): string {
  const start = new Date(`${weekStart}T00:00:00-05:00`);
  const end = new Date(`${addDaysToISODate(weekStart, 4)}T00:00:00-05:00`);
  const opts: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'short' };
  return `${start.toLocaleDateString('es-PE', opts)} – ${end.toLocaleDateString('es-PE', opts)}`;
}

function formatSlotTime(iso: string): string {
  return new Date(iso).toLocaleTimeString('es-PE', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
    timeZone: 'America/Lima',
  });
}

function slotDayKey(iso: string): string {
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: 'America/Lima',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(new Date(iso));
}

export const BookingWidget: React.FC = () => {
  const [selectedService, setSelectedService] = useState('');
  const [availability, setAvailability] = useState<AvailabilityResponse | null>(null);
  const [loadingWeek, setLoadingWeek] = useState(false);
  const [weekError, setWeekError] = useState<string | null>(null);

  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);
  const [showAllSlots, setShowAllSlots] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [helpMessage, setHelpMessage] = useState('');
  const [isBooking, setIsBooking] = useState(false);
  const [bookingError, setBookingError] = useState<string | null>(null);
  const [bookingResult, setBookingResult] = useState<BookingResult | null>(null);

  const fetchWeek = useCallback(async (weekStart?: string) => {
    setLoadingWeek(true);
    setWeekError(null);
    try {
      const url = weekStart ? `/api/availability?weekStart=${weekStart}` : '/api/availability';
      const response = await fetch(url);
      if (!response.ok) throw new Error('request failed');
      const data: AvailabilityResponse = await response.json();
      setAvailability(data);
    } catch {
      setWeekError('No pude cargar los horarios disponibles. Intenta de nuevo en unos minutos.');
    } finally {
      setLoadingWeek(false);
    }
  }, []);

  useEffect(() => {
    if (selectedService && !availability && !loadingWeek) {
      fetchWeek();
    }
  }, [selectedService, availability, loadingWeek, fetchWeek]);

  const handleServiceChange = (value: string) => {
    setSelectedService(value);
    setSelectedSlot(null);
    setShowAllSlots(false);
    setBookingResult(null);
    setBookingError(null);
  };

  const goToWeek = (direction: -1 | 1) => {
    if (!availability) return;
    const nextWeekStart = addDaysToISODate(availability.weekStart, direction * 7);
    if (nextWeekStart < availability.thisMonday || nextWeekStart > availability.maxMonday) return;
    setSelectedSlot(null);
    setShowAllSlots(false);
    fetchWeek(nextWeekStart);
  };

  const handleBook = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSlot) return;
    setBookingError(null);
    setIsBooking(true);
    try {
      const response = await fetch('/api/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          service: selectedService,
          start: selectedSlot.start,
          end: selectedSlot.end,
          name,
          email,
          helpMessage,
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        setBookingError(data.error ?? 'No pudimos crear la reserva.');
        if (response.status === 409) {
          setSelectedSlot(null);
          fetchWeek(availability?.weekStart);
        }
        return;
      }
      setBookingResult({ meetLink: data.meetLink, eventLink: data.eventLink });
    } catch {
      setBookingError('No pudimos crear la reserva. Revisa tu conexión e intenta de nuevo.');
    } finally {
      setIsBooking(false);
    }
  };

  const slotsByDay = useMemo(() => {
    const map = new Map<string, Slot[]>();
    if (!availability) return map;
    for (const slot of availability.slots) {
      const key = slotDayKey(slot.start);
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(slot);
    }
    return map;
  }, [availability]);

  const selectedServiceTitle = SERVICE_CATALOG.find((s) => s.slug === selectedService)?.title ?? '';

  return (
    <div className="bg-white rounded-3xl border border-line shadow-xl overflow-hidden text-ink">

      <div className="p-6 sm:p-8 border-b border-line/60">
        <label className="block text-xs font-semibold text-ink mb-2 flex items-center gap-1.5">
          <CalendarCheck weight="bold" className="text-ink/60" />
          <span>¿Qué servicio te interesa?</span>
        </label>
        <div className="relative">
          <select
            required
            value={selectedService}
            onChange={(e) => handleServiceChange(e.target.value)}
            className="w-full appearance-none px-4 py-3 pr-10 rounded-xl border border-line bg-mist-subtle focus:bg-white text-sm text-ink focus:outline-none focus:border-ink transition-colors cursor-pointer"
          >
            <option value="" disabled>Selecciona un servicio</option>
            {SERVICE_CATALOG.map((s) => (
              <option key={s.slug} value={s.slug}>{s.title}</option>
            ))}
          </select>
          <CaretDown weight="bold" className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-ink/40" />
        </div>
      </div>

      <div className="min-h-[440px]">
        {!selectedService && (
          <div className="h-[440px] flex flex-col items-center justify-center text-center px-8 gap-2">
            <CalendarCheck weight="light" className="w-10 h-10 text-ink/20" />
            <p className="text-sm text-ink/50 font-light max-w-xs">Elige un servicio arriba para ver mis horarios disponibles.</p>
          </div>
        )}

        {selectedService && bookingResult && (
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            className="h-[440px] flex flex-col items-center justify-center text-center px-8 gap-4"
          >
            <div className="w-16 h-16 rounded-full bg-mist text-ink flex items-center justify-center">
              <CheckCircle weight="fill" className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-light tracking-tight text-ink">¡Reunión agendada!</h3>
            <p className="text-sm text-ink/70 max-w-sm">
              Te llegó la invitación a {email}. Nos vemos para hablar de {selectedServiceTitle.toLowerCase()}.
            </p>
            {bookingResult.meetLink && (
              <a
                href={bookingResult.meetLink}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-ink text-white text-xs font-semibold hover:bg-black transition-colors"
              >
                <VideoCamera weight="bold" className="w-4 h-4" />
                <span>Link de Google Meet</span>
              </a>
            )}
            <button
              onClick={() => {
                setBookingResult(null);
                setSelectedSlot(null);
                setName('');
                setEmail('');
                setHelpMessage('');
              }}
              className="text-xs text-ink/50 hover:text-ink underline underline-offset-2"
            >
              Agendar otra llamada
            </button>
          </motion.div>
        )}

        {selectedService && !bookingResult && selectedSlot && (
          <form onSubmit={handleBook} className="p-6 sm:p-8 space-y-4">
            <button
              type="button"
              onClick={() => setSelectedSlot(null)}
              className="text-xs text-ink/50 hover:text-ink flex items-center gap-1"
            >
              <CaretLeft weight="bold" className="w-3 h-3" />
              <span>Volver a horarios</span>
            </button>

            <div className="p-3.5 rounded-xl bg-mist-subtle border border-line text-sm text-ink">
              <span className="font-semibold">{selectedServiceTitle}</span>
              <br />
              {availability && formatWeekRange(availability.weekStart)} · {formatSlotTime(selectedSlot.start)} (hora de Lima)
            </div>

            <div>
              <label className="block text-xs font-semibold text-ink mb-1.5">Nombre</label>
              <input
                required
                type="text"
                placeholder="Tu nombre"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-line bg-mist-subtle focus:bg-white text-sm focus:outline-none focus:border-ink transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-ink mb-1.5">Email</label>
              <input
                required
                type="email"
                placeholder="tu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-line bg-mist-subtle focus:bg-white text-sm focus:outline-none focus:border-ink transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-ink mb-1.5">¿Cómo te gustaría que te ayudemos?</label>
              <textarea
                rows={2}
                placeholder="Cuéntame brevemente tu caso (opcional)"
                value={helpMessage}
                onChange={(e) => setHelpMessage(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-line bg-mist-subtle focus:bg-white text-sm focus:outline-none focus:border-ink transition-colors resize-none"
              />
            </div>

            {bookingError && (
              <Reveal
                trigger="mount"
                y={-6}
                className="flex items-start gap-2 p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs"
              >
                <WarningCircle weight="fill" className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{bookingError}</span>
              </Reveal>
            )}

            <button
              type="submit"
              disabled={isBooking}
              className="w-full py-3.5 px-6 rounded-full bg-ink hover:bg-black text-white text-sm font-bold shadow-md hover:shadow-lg transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isBooking ? 'Confirmando...' : 'Confirmar reserva'}
            </button>
          </form>
        )}

        {selectedService && !bookingResult && !selectedSlot && (
          <div className="p-6 sm:p-8">
            <div className="flex items-center justify-between mb-4">
              <button
                type="button"
                onClick={() => goToWeek(-1)}
                disabled={!availability || availability.weekStart <= availability.thisMonday}
                className="w-8 h-8 rounded-full border border-line flex items-center justify-center text-ink/60 hover:text-ink hover:border-ink transition-colors disabled:opacity-30 disabled:pointer-events-none"
                aria-label="Semana anterior"
              >
                <CaretLeft weight="bold" className="w-3.5 h-3.5" />
              </button>
              <span className="text-xs font-mono uppercase tracking-wide text-ink/60">
                {availability ? formatWeekRange(availability.weekStart) : ' '}
              </span>
              <button
                type="button"
                onClick={() => goToWeek(1)}
                disabled={!availability || availability.weekStart >= availability.maxMonday}
                className="w-8 h-8 rounded-full border border-line flex items-center justify-center text-ink/60 hover:text-ink hover:border-ink transition-colors disabled:opacity-30 disabled:pointer-events-none"
                aria-label="Semana siguiente"
              >
                <CaretRight weight="bold" className="w-3.5 h-3.5" />
              </button>
            </div>

            {loadingWeek && (
              <div className="h-64 flex items-center justify-center text-sm text-ink/40 font-light">Cargando horarios…</div>
            )}

            {weekError && !loadingWeek && (
              <div className="h-64 flex flex-col items-center justify-center text-center gap-3 px-6">
                <p className="text-sm text-ink/50 font-light">{weekError}</p>
                <button
                  onClick={() => fetchWeek(availability?.weekStart)}
                  className="text-xs font-semibold text-ink underline underline-offset-2"
                >
                  Reintentar
                </button>
              </div>
            )}

            {!loadingWeek && !weekError && availability && availability.slots.length === 0 && (
              <div className="h-64 flex items-center justify-center text-center px-6">
                <p className="text-sm text-ink/50 font-light">No quedan horarios disponibles esta semana. Prueba la semana siguiente.</p>
              </div>
            )}

            {!loadingWeek && !weekError && availability && availability.slots.length > 0 && (
              <>
                <div className="grid grid-cols-5 gap-2 sm:gap-3">
                  {Array.from({ length: 5 }, (_, i) => addDaysToISODate(availability.weekStart, i)).map((dateStr, i) => {
                    const daySlots = slotsByDay.get(dateStr) ?? [];
                    const visibleSlots = showAllSlots ? daySlots : daySlots.slice(0, MAX_SLOTS_PER_DAY);
                    return (
                      <div key={dateStr} className="space-y-1.5">
                        <div className="text-center text-[10px] sm:text-xs font-mono uppercase text-ink/40 mb-2">
                          {DAY_LABELS[i]}
                        </div>
                        {visibleSlots.length === 0 ? (
                          <div className="text-center text-[10px] text-ink/25 font-light">—</div>
                        ) : (
                          visibleSlots.map((slot) => (
                            <button
                              key={slot.start}
                              type="button"
                              onClick={() => setSelectedSlot(slot)}
                              className="w-full py-1.5 sm:py-2 rounded-lg border border-line text-[10px] sm:text-xs font-medium text-ink hover:border-ink hover:bg-mist-subtle transition-colors"
                            >
                              {formatSlotTime(slot.start)}
                            </button>
                          ))
                        )}
                      </div>
                    );
                  })}
                </div>

                {!showAllSlots && Array.from(slotsByDay.values()).some((s) => s.length > MAX_SLOTS_PER_DAY) && (
                  <button
                    type="button"
                    onClick={() => setShowAllSlots(true)}
                    className="mt-4 w-full text-center text-xs font-semibold text-ink/60 hover:text-ink underline underline-offset-2"
                  >
                    Ver más horarios
                  </button>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
