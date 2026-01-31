import { eq } from 'drizzle-orm';
import { db } from '@lib/db';
import { stints } from '@lib/schema';

export const getAllStints = async () => {
  return await db.query.stints.findMany({
    with: {
      session: true,
      driver: true,
    },
  });
};

export const getStintsBySessionId = async (sessionId: number) => {
  return await db.query.stints.findMany({
    where: eq(stints.sessionId, sessionId),
    with: {
      driver: true,
    },
  });
};

export const getStintById = async (id: number) => {
  return await db.query.stints.findFirst({
    where: eq(stints.id, id),
    with: {
      session: true,
      driver: true,
      lapTimes: true,
    },
  });
};

export const createStint = async (data: typeof stints.$inferInsert) => {
  return await db.insert(stints).values(data).returning();
};

export const updateStint = async (id: number, data: Partial<typeof stints.$inferInsert>) => {
  return await db.update(stints).set(data).where(eq(stints.id, id)).returning();
};

export const deleteStint = async (id: number) => {
  return await db.delete(stints).where(eq(stints.id, id)).returning();
};