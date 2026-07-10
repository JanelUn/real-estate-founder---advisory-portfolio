# Yanel — Portfolio de Founder & Developer

Landing page personal de Yanel (founder de Dommies), construida como SPA con React + Vite + Tailwind CSS.

## Stack

- React 19 + TypeScript
- Vite 6
- Tailwind CSS 4 (`@tailwindcss/vite`)
- `motion` (Framer Motion) para animaciones
- Phosphor Icons
- Funciones serverless en `/api` (Node + `googleapis`) para el agendado de llamadas, desplegadas en Vercel

## Desarrollo local

**Requisitos:** Node.js

1. Instalar dependencias:
   `npm install`
2. Levantar el servidor de desarrollo:
   `npm run dev`

El servidor de `npm run dev` sirve el frontend, pero **no** ejecuta las funciones de `/api` (son específicas de Vercel). Para probar el agendado de llamadas en local con datos reales necesitas la CLI de Vercel: `npx vercel dev` en vez de `npm run dev` (usa las mismas variables de entorno de `.env.local`).

## Scripts

- `npm run dev` — servidor de desarrollo (puerto 3000)
- `npm run build` — build de producción
- `npm run preview` — sirve el build de producción localmente
- `npm run lint` — chequeo de tipos (`tsc --noEmit`)
- `npm run clean` — elimina la carpeta `dist`
- `npm run get-google-token` — obtiene el `GOOGLE_REFRESH_TOKEN` para conectar Google Calendar (ver abajo)

## Conectar Google Calendar (agendado de llamadas)

La sección de contacto deja que el visitante elija un servicio y agende una llamada directamente en tu Google Calendar real (sin Calendly ni intermediarios). Para que funcione necesitas hacer, **una sola vez**, lo siguiente:

### 1. Crear el proyecto en Google Cloud

1. Ve a [console.cloud.google.com](https://console.cloud.google.com/) y crea un proyecto nuevo (o usa uno existente).
2. En el buscador, ve a **"Google Calendar API"** y haz clic en **Habilitar**.
3. Ve a **APIs y servicios → Pantalla de consentimiento OAuth**:
   - Tipo de usuario: **Externo**.
   - Completa nombre de la app, tu correo de soporte y tu correo como developer contact.
   - En "Scopes" no hace falta agregar nada manualmente.
   - En "Test users", agrega tu propio correo de Gmail.
   - Importante: mientras la app esté en modo **"Testing"**, Google invalida el refresh token a los 7 días (se rompería el agendado cada semana). Para evitarlo, haz clic en **"Publish App"** para pasarla a estado **"In production"**. No necesitas pasar la revisión/verificación de Google para esto — como solo tú vas a autorizar la app, al hacerlo verás una pantalla de advertencia ("Google no verificó esta app"); haz clic en **Avanzado → Ir a [nombre de tu app] (no seguro)** para continuar. Es seguro: es tu propia app, autorizándose con tu propia cuenta.
4. Ve a **APIs y servicios → Credenciales → Crear credenciales → ID de cliente de OAuth**:
   - Tipo de aplicación: **Aplicación web**.
   - En "URI de redireccionamiento autorizados", agrega exactamente:
     `http://localhost:3939/oauth2callback`
   - Guarda y copia el **Client ID** y el **Client secret**.

### 2. Obtener el refresh token

1. Crea un archivo `.env.local` en la raíz del proyecto (copia `.env.example`) y pega ahí tu `GOOGLE_CLIENT_ID` y `GOOGLE_CLIENT_SECRET`.
2. Corre:
   `npm run get-google-token`
3. Se abrirá una URL en la terminal — ábrela en tu navegador, inicia sesión con la cuenta de Gmail cuyo calendario quieres conectar, y acepta los permisos.
4. La terminal imprimirá tu `GOOGLE_REFRESH_TOKEN`. Pégalo en `.env.local`.

### 3. Configurar las variables en Vercel

En tu proyecto de Vercel, ve a **Settings → Environment Variables** y agrega las variables de `.env.local` (`GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `GOOGLE_REFRESH_TOKEN`, `GOOGLE_CALENDAR_ID`, `GOOGLE_BUSY_CALENDAR_IDS`, `NOTIFY_EMAIL`). Luego haz un deploy (o redeploy) para que tomen efecto.

### Configuración del horario de atención

Los días/horas en los que se muestran horarios disponibles están en [api/_lib/schedule.ts](api/_lib/schedule.ts): por defecto Lunes a Viernes, 9:00–18:00 hora de Lima, bloques de 30 minutos, con mínimo 12 horas de anticipación y hasta 4 semanas a futuro. Cambia esas constantes si quieres otro horario.

### Si tienes reuniones en varios calendarios

Si usas más de un calendario de Google (por ejemplo, uno para un programa de incubación además de tu calendario principal), define `GOOGLE_BUSY_CALENDAR_IDS` en `.env.local` y en Vercel con la lista de IDs separados por coma — así una reunión en cualquiera de esos calendarios bloquea la disponibilidad, aunque el evento nuevo siempre se crea en `GOOGLE_CALENDAR_ID`. Encuentra el ID de un calendario en Google Calendar → ⚙️ Configuración → selecciona el calendario en la barra lateral → "Integrar calendario" → "ID de calendario".

### Notificarte por correo de cada reserva

Por defecto, cuando alguien agenda, Google Calendar le manda la invitación **solo al visitante** — como tú eres quien crea el evento (organizadora), Google no te notifica a ti misma. La solución: agregar `NOTIFY_EMAIL` en `.env.local` y en Vercel con **una cuenta de Google distinta** a la del calendario que conectaste (ej. `dommies.dev@gmail.com` en vez de tu cuenta personal) — el backend la agrega como invitada adicional en cada evento, y como es una cuenta distinta a la organizadora, Google sí le manda la invitación (con el link de Meet incluido).

Importante: si `NOTIFY_EMAIL` es la **misma** cuenta que usaste para conectar el calendario, Google reconoce que es la organizadora y no manda el correo — probamos esto y está confirmado. Tiene que ser una cuenta distinta.

Si `NOTIFY_EMAIL` no está definida, simplemente no se agrega esa invitada adicional (el agendado sigue funcionando igual para el visitante, y el evento igual queda en tu calendario).
