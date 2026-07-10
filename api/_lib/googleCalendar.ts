import { google } from 'googleapis';

let cachedClient: ReturnType<typeof google.calendar> | null = null;

export function getCalendarClient(): ReturnType<typeof google.calendar> {
  if (cachedClient) return cachedClient;

  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  const refreshToken = process.env.GOOGLE_REFRESH_TOKEN;

  if (!clientId || !clientSecret || !refreshToken) {
    throw new Error(
      'Faltan variables de entorno de Google Calendar (GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_REFRESH_TOKEN).'
    );
  }

  const auth = new google.auth.OAuth2(clientId, clientSecret);
  auth.setCredentials({ refresh_token: refreshToken });

  cachedClient = google.calendar({ version: 'v3', auth });
  return cachedClient;
}

export const CALENDAR_ID = process.env.GOOGLE_CALENDAR_ID || 'primary';

// Calendarios a considerar como "ocupado" al calcular disponibilidad (además
// del calendario donde se crean los eventos nuevos). Acepta una lista separada
// por comas en GOOGLE_BUSY_CALENDAR_IDS; si no está definida, solo se usa
// CALENDAR_ID.
export const BUSY_CALENDAR_IDS = process.env.GOOGLE_BUSY_CALENDAR_IDS
  ? process.env.GOOGLE_BUSY_CALENDAR_IDS.split(',').map((id) => id.trim()).filter(Boolean)
  : [CALENDAR_ID];
