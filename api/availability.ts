import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getCalendarClient, BUSY_CALENDAR_IDS } from './_lib/googleCalendar.js';
import {
  TIMEZONE,
  MIN_NOTICE_HOURS,
  WEEKS_AHEAD,
  generateWeekSlots,
  getMonday,
  addDays,
  todayISODate,
  isSlotFree,
  type BusyInterval,
} from './_lib/schedule.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Método no permitido' });
    return;
  }

  try {
    const thisMonday = getMonday(todayISODate());
    const maxMonday = addDays(thisMonday, WEEKS_AHEAD * 7);

    const requestedWeek = typeof req.query.weekStart === 'string' ? req.query.weekStart : thisMonday;
    let weekStart = getMonday(requestedWeek);
    if (weekStart < thisMonday) weekStart = thisMonday;
    if (weekStart > maxMonday) weekStart = maxMonday;

    const candidateSlots = generateWeekSlots(weekStart);
    const minStartTime = Date.now() + MIN_NOTICE_HOURS * 60 * 60 * 1000;
    const futureSlots = candidateSlots.filter((s) => new Date(s.start).getTime() >= minStartTime);

    let busy: BusyInterval[] = [];
    if (futureSlots.length > 0) {
      const calendar = getCalendarClient();
      const timeMin = futureSlots[0].start;
      const timeMax = futureSlots[futureSlots.length - 1].end;
      const fbResponse = await calendar.freebusy.query({
        requestBody: {
          timeMin,
          timeMax,
          timeZone: TIMEZONE,
          items: BUSY_CALENDAR_IDS.map((id) => ({ id })),
        },
      });
      const calendars = fbResponse.data.calendars ?? {};
      busy = BUSY_CALENDAR_IDS.flatMap((id) => calendars[id]?.busy ?? [])
        .filter((b): b is { start: string; end: string } => Boolean(b.start && b.end))
        .map((b) => ({ start: b.start, end: b.end }));
    }

    const availableSlots = futureSlots.filter((s) => isSlotFree(s, busy));

    res.status(200).json({
      weekStart,
      thisMonday,
      maxMonday,
      timezone: TIMEZONE,
      slots: availableSlots,
    });
  } catch (error) {
    console.error('Error en /api/availability', error);
    res.status(500).json({ error: 'No se pudo cargar la disponibilidad. Intenta nuevamente en unos minutos.' });
  }
}
