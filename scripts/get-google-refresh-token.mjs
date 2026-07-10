import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { google } from 'googleapis';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const envLocalPath = path.resolve(__dirname, '..', '.env.local');

function loadEnvLocal() {
  if (!fs.existsSync(envLocalPath)) return;
  const contents = fs.readFileSync(envLocalPath, 'utf-8');
  for (const line of contents.split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eqIndex = trimmed.indexOf('=');
    if (eqIndex === -1) continue;
    const key = trimmed.slice(0, eqIndex).trim();
    const value = trimmed.slice(eqIndex + 1).trim();
    if (!(key in process.env)) process.env[key] = value;
  }
}

loadEnvLocal();

const PORT = 3939;
const REDIRECT_URI = `http://localhost:${PORT}/oauth2callback`;
const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

if (!CLIENT_ID || !CLIENT_SECRET) {
  console.error('\nFalta GOOGLE_CLIENT_ID y/o GOOGLE_CLIENT_SECRET.');
  console.error('Agrégalos a un archivo .env.local en la raíz del proyecto, o expórtalos antes de correr este script:\n');
  console.error('  GOOGLE_CLIENT_ID=... GOOGLE_CLIENT_SECRET=... node scripts/get-google-refresh-token.mjs\n');
  process.exit(1);
}

console.log(`\nRecuerda: el redirect URI autorizado en Google Cloud debe incluir exactamente:\n  ${REDIRECT_URI}`);

const oauth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);

const authUrl = oauth2Client.generateAuthUrl({
  access_type: 'offline',
  prompt: 'consent',
  scope: ['https://www.googleapis.com/auth/calendar'],
});

console.log('\n1. Abre esta URL en tu navegador e inicia sesión con la cuenta de Google Calendar que quieres conectar:\n');
console.log(authUrl);
console.log('\n2. Acepta los permisos. Este script capturará automáticamente el resultado.\n');
console.log(`Esperando en http://localhost:${PORT} ...\n`);

const server = http.createServer(async (req, res) => {
  if (!req.url || !req.url.startsWith('/oauth2callback')) {
    res.writeHead(404);
    res.end();
    return;
  }

  const url = new URL(req.url, `http://localhost:${PORT}`);
  const code = url.searchParams.get('code');
  const error = url.searchParams.get('error');

  if (error) {
    res.writeHead(400, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end('<h1>Autorización cancelada.</h1><p>Puedes cerrar esta ventana.</p>');
    console.error('\nAutorización cancelada:', error);
    server.close();
    process.exit(1);
    return;
  }

  if (!code) {
    res.writeHead(400);
    res.end('Falta el parámetro "code".');
    return;
  }

  try {
    const { tokens } = await oauth2Client.getToken(code);
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end('<h1>¡Listo!</h1><p>Ya puedes cerrar esta ventana y volver a la terminal.</p>');

    console.log('\n✅ Autorización exitosa. Agrega estas líneas a tu .env.local y a las variables de entorno de Vercel:\n');
    console.log(`GOOGLE_CLIENT_ID=${CLIENT_ID}`);
    console.log(`GOOGLE_CLIENT_SECRET=${CLIENT_SECRET}`);
    console.log(`GOOGLE_REFRESH_TOKEN=${tokens.refresh_token}`);
    console.log('GOOGLE_CALENDAR_ID=primary\n');

    if (!tokens.refresh_token) {
      console.warn('⚠️  Google no devolvió un refresh_token. Esto pasa si ya habías autorizado esta app antes.');
      console.warn('   Ve a https://myaccount.google.com/permissions, quita el acceso a esta app, y vuelve a correr este script.\n');
    }
  } catch (err) {
    console.error('\nError al intercambiar el código por tokens:', err);
    res.writeHead(500);
    res.end('Error al obtener tokens. Revisa la terminal.');
  } finally {
    setTimeout(() => {
      server.close();
      process.exit(0);
    }, 500);
  }
});

server.listen(PORT);
