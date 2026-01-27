import 'dotenv/config';
import { drizzle } from 'drizzle-orm/libsql';
import { migrate } from 'drizzle-orm/libsql/migrator';
import { createClient } from '@libsql/client';

// Configuración del cliente de Turso
const client = createClient({
  url: process.env.TURSO_DATABASE_URL!,
  authToken: process.env.TURSO_AUTH_TOKEN!,
});

const db = drizzle(client);

async function main() {
  console.log('🏗️  Iniciando creación de tablas (migración)...');
  
  // Lee la carpeta 'drizzle' (definida en tu config) y aplica los cambios
  await migrate(db, { migrationsFolder: 'src/lib/drizzle' });

  console.log('✅ Tablas creadas y actualizadas exitosamente.');
  process.exit(0);
}

main().catch((err) => {
  console.error('❌ Error crítico al crear tablas:', err);
  process.exit(1);
});