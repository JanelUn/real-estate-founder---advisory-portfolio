import type { VercelRequest, VercelResponse } from '@vercel/node';
import { randomUUID } from 'crypto';
import { getCalendarClient, CALENDAR_ID, BUSY_CALENDAR_IDS } from './_lib/googleCalendar';
import { TIMEZONE, MIN_NOTICE_HOURS, isSlotFree, type BusyInterval } from './_lib/schedule';
import { SERVICE_CATALOG } from '../shared/services';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Método no permitido' });
    return;
  }

  const { service, start, end, name, email, helpMessage } = req.body ?? {};

  if (
    typeof service !== 'string' ||
    typeof start !== 'string' ||
    typeof end !== 'string' ||
    typeof name !== 'string' ||
    typeof email !== 'string'
  ) {
    res.status(400).json({ error: 'Faltan campos requeridos.' });
    return;
  }

  const serviceEntry = SERVICE_CATALOG.find((s) => s.slug === service);
  if (!serviceEntry) {
    res.status(400).json({ error: 'Servicio no válido.' });
    return;
  }

  if (!name.trim() || !EMAIL_REGEX.test(email.trim())) {
    res.status(400).json({ error: 'Nombre o email inválido.' });
    return;
  }

  const startTime = new Date(start).getTime();
  const endTime = new Date(end).getTime();
  if (!Number.isFinite(startTime) || !Number.isFinite(endTime) || endTime <= startTime) {
    res.status(400).json({ error: 'Horario inválido.' });
    return;
  }
  if (startTime < Date.now() + MIN_NOTICE_HOURS * 60 * 60 * 1000) {
    res.status(400).json({ error: 'Ese horario ya no está disponible con la anticipación mínima requerida.' });
    return;
  }

  try {
    const calendar = getCalendarClient();

    // Revalida disponibilidad justo antes de crear el evento, para evitar dobles reservas.
    const fbResponse = await calendar.freebusy.query({
      requestBody: {
        timeMin: start,
        timeMax: end,
        timeZone: TIMEZONE,
        items: BUSY_CALENDAR_IDS.map((id) => ({ id })),
      },
    });
    const fbCalendars = fbResponse.data.calendars ?? {};
    const busy: BusyInterval[] = BUSY_CALENDAR_IDS.flatMap((id) => fbCalendars[id]?.busy ?? [])
      .filter((b): b is { start: string; end: string } => Boolean(b.start && b.end))
      .map((b) => ({ start: b.start, end: b.end }));

    if (!isSlotFree({ start, end }, busy)) {
      res.status(409).json({ error: 'Ese horario acaba de reservarse. Elige otro.' });
      return;
    }

    const visitorEmail = email.trim();
    const notifyEmail = process.env.NOTIFY_EMAIL?.trim();

    const attendees = [{ email: visitorEmail, displayName: name.trim() }];
    if (notifyEmail && notifyEmail.toLowerCase() !== visitorEmail.toLowerCase()) {
      attendees.push({ email: notifyEmail, displayName: 'Yanel' });
    }

    const trimmedHelpMessage = typeof helpMessage === 'string' ? helpMessage.trim() : '';
    const description = [
      `Servicio de interés: ${serviceEntry.title}`,
      trimmedHelpMessage && `¿Cómo le gustaría que le ayudemos?: ${trimmedHelpMessage}`,
      'Agendado desde el sitio web.',
    ]
      .filter(Boolean)
      .join('\n');

    const event = await calendar.events.insert({
      calendarId: CALENDAR_ID,
      conferenceDataVersion: 1,
      sendUpdates: 'all',
      requestBody: {
        summary: `Llamada — ${serviceEntry.title} — ${name.trim()}`,
        description,
        start: { dateTime: start, timeZone: TIMEZONE },
        end: { dateTime: end, timeZone: TIMEZONE },
        attendees,
        conferenceData: {
          createRequest: {
            requestId: randomUUID(),
            conferenceSolutionKey: { type: 'hangoutsMeet' },
          },
        },
      },
    });

    res.status(200).json({
      ok: true,
      meetLink: event.data.hangoutLink ?? null,
      eventLink: event.data.htmlLink ?? null,
    });
  } catch (error) {
    console.error('Error en /api/book', error);
    res.status(500).json({ error: 'No pudimos crear la reserva. Intenta nuevamente.' });
  }
}
