import { eq, asc } from 'drizzle-orm';
import { db } from '@lib/db';
import { sessions } from '@lib/schema';

// Obtener todas las sesiones, ordenadas por fecha de inicio
export const getAllSessions = async () => {
  return await db.query.sessions.findMany({
    orderBy: (sessions, { asc }) => [asc(sessions.inicio)],
    with: {
      circuit: true,
    },
  });
};

// Obtener una sesión por su ID
export const getSessionById = async (id: number) => {
  return await db.query.sessions.findFirst({
    where: eq(sessions.id, id),
    with: {
      circuit: true,
    },
  });
};

// Crear una nueva sesión
export const createSession = async (data: typeof sessions.$inferInsert) => {
  return await db.insert(sessions).values(data).returning();
};

// Actualizar una sesión existente
export const updateSession = async (id: number, data: Partial<typeof sessions.$inferInsert>) => {
  return await db.update(sessions).set(data).where(eq(sessions.id, id)).returning();
};

// Eliminar una sesión
export const deleteSession = async (id: number) => {
  return await db.delete(sessions).where(eq(sessions.id, id)).returning();
};