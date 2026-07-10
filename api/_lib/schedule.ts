export const TIMEZONE = 'America/Lima';
export const UTC_OFFSET = '-05:00';
export const WORK_START_HOUR = 9;
export const WORK_END_HOUR = 18;
export const SLOT_MINUTES = 30;
export const MIN_NOTICE_HOURS = 12;
export const WEEKS_AHEAD = 4;
const WORK_DAYS_PER_WEEK = 5;

export interface Slot {
  start: string;
  end: string;
}

export interface BusyInterval {
  start: string;
  end: string;
}

function pad(n: number): string {
  return n.toString().padStart(2, '0');
}

function parseISODate(dateStr: string): Date {
  const [y, m, d] = dateStr.split('-').map(Number);
  return new Date(Date.UTC(y, m - 1, d));
}

function formatISODate(date: Date): string {
  return date.toISOString().slice(0, 10);
}

export function addDays(dateStr: string, days: number): string {
  const date = parseISODate(dateStr);
  date.setUTCDate(date.getUTCDate() + days);
  return formatISODate(date);
}

export function getMonday(dateStr: string): string {
  const date = parseISODate(dateStr);
  const day = date.getUTCDay();
  const diff = day === 0 ? -6 : 1 - day;
  date.setUTCDate(date.getUTCDate() + diff);
  return formatISODate(date);
}

export function todayISODate(): string {
  return new Date().toISOString().slice(0, 10);
}

function timeStringAt(dateStr: string, totalMinutesFromMidnight: number): string {
  const h = Math.floor(totalMinutesFromMidnight / 60);
  const m = totalMinutesFromMidnight % 60;
  return `${dateStr}T${pad(h)}:${pad(m)}:00${UTC_OFFSET}`;
}

export function generateWeekSlots(weekStartMonday: string): Slot[] {
  const slots: Slot[] = [];
  const startMin = WORK_START_HOUR * 60;
  const endMin = WORK_END_HOUR * 60;

  for (let dayOffset = 0; dayOffset < WORK_DAYS_PER_WEEK; dayOffset++) {
    const dateStr = addDays(weekStartMonday, dayOffset);
    for (let min = startMin; min + SLOT_MINUTES <= endMin; min += SLOT_MINUTES) {
      slots.push({
        start: timeStringAt(dateStr, min),
        end: timeStringAt(dateStr, min + SLOT_MINUTES),
      });
    }
  }
  return slots;
}

export function isSlotFree(slot: Slot, busy: BusyInterval[]): boolean {
  const slotStart = new Date(slot.start).getTime();
  const slotEnd = new Date(slot.end).getTime();
  return !busy.some((b) => {
    const busyStart = new Date(b.start).getTime();
    const busyEnd = new Date(b.end).getTime();
    return slotStart < busyEnd && busyStart < slotEnd;
  });
}
