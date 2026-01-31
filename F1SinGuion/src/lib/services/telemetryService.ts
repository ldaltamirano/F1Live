import { eq } from 'drizzle-orm';
import { db } from '@lib/db';
import { telemetry } from '@lib/schema';

// La telemetría suele ser muy voluminosa, así que filtramos por vuelta específica
export const getTelemetryByLapTimeId = async (lapTimeId: number) => {
  return await db.query.telemetry.findMany({
    where: eq(telemetry.lapToimeId, lapTimeId),
    with: {
      driver: true,
    },
  });
};

export const createTelemetry = async (data: typeof telemetry.$inferInsert) => {
  return await db.insert(telemetry).values(data).returning();
};

export const deleteTelemetry = async (id: number) => {
  return await db.delete(telemetry).where(eq(telemetry.id, id)).returning();
};