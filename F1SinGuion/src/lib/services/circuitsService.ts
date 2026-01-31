import { eq } from 'drizzle-orm';
import { db } from '@lib/db';
import { circuits, sessions } from '@lib/schema';

// Exportamos el tipo inferido desde la DB, incluyendo la relación con sesiones
export type Circuit = typeof circuits.$inferSelect & {
  sessions: typeof sessions.$inferSelect[];
};

export const getAllCircuits = async () => {
  return await db.query.circuits.findMany({
    orderBy: (circuits, { asc }) => [asc(circuits.fecha)],
    with: {
      sessions: {
        orderBy: (sessions, { asc }) => [asc(sessions.inicio)],
      },
    },
  });
};

export const getcircuitsById = async (id: string | number) => {
  return await db.query.circuits.findFirst({
    where: eq(circuits.id, Number(id)),
    with: {
      sessions: {
        orderBy: (sessions, { asc }) => [asc(sessions.inicio)],
      },
    },
  });
};

export const getcircuitsBySlug = async (slug: string) => {
  return await db.query.circuits.findFirst({
    where: eq(circuits.index, slug),
    with: {
      sessions: {
        orderBy: (sessions, { asc }) => [asc(sessions.inicio)],
      },
    },
  });
};

export const createcircuits = async (data: typeof circuits.$inferInsert) => {
  return await db.insert(circuits).values(data).returning();
};

export const updatecircuits = async (id: string | number, data: Partial<typeof circuits.$inferInsert>) => {
  return await db.update(circuits).set(data).where(eq(circuits.id, Number(id))).returning();
};

export const deletecircuits = async (id: string | number) => {
  return await db.delete(circuits).where(eq(circuits.id, Number(id))).returning();
};
