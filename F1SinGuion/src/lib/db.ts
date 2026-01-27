import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';
import * as schema from './schema';

// Detectar variables de entorno (Compatible con Astro/Vite y Node.js)
const url = import.meta.env?.TURSO_DATABASE_URL || process.env.TURSO_DATABASE_URL;
const authToken = import.meta.env?.TURSO_AUTH_TOKEN || process.env.TURSO_AUTH_TOKEN;

if (!url || !authToken) {
  throw new Error('❌ Error de Configuración: Faltan TURSO_DATABASE_URL o TURSO_AUTH_TOKEN');
}

const client = createClient({
  url,
  authToken,
});

export const db = drizzle(client, { schema });