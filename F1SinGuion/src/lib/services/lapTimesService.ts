import { eq, asc } from 'drizzle-orm';
import { db } from '@lib/db';
import { lapTimes } from '@lib/schema';

export const getAllLapTimes = async (limit = 100) => {
  return await db.query.lapTimes.findMany({
    limit: limit,
    with: {
      driver: true,
      session: true,
    },
  });
};

export const getLapTimesBySession = async (sessionId: number) => {
  return await db.query.lapTimes.findMany({
    where: eq(lapTimes.sessionId, sessionId),
    orderBy: (lapTimes, { asc }) => [asc(lapTimes.lap), asc(lapTimes.position)],
    with: {
      driver: true,
    },
  });
};

export const getLapTimeById = async (id: number) => {
  return await db.query.lapTimes.findFirst({
    where: eq(lapTimes.id, id),
    with: {
      driver: true,
      telemetry: true,
    },
  });
};

export const createLapTime = async (data: typeof lapTimes.$inferInsert) => {
  return await db.insert(lapTimes).values(data).returning();
};

export const updateLapTime = async (id: number, data: Partial<typeof lapTimes.$inferInsert>) => {
  return await db.update(lapTimes).set(data).where(eq(lapTimes.id, id)).returning();
};

export const deleteLapTime = async (id: number) => {
  return await db.delete(lapTimes).where(eq(lapTimes.id, id)).returning();
};