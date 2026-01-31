import { eq } from 'drizzle-orm';
import { db } from '@lib/db';
import { drivers } from '@lib/schema';

export const getAllDrivers = async () => {
  return await db.query.drivers.findMany({
    with: {
      team: true,
      stints: true,
      lapTimes: true,
    },
  });
};

export const getDriverById = async (id: number) => {
  return await db.query.drivers.findFirst({
    where: eq(drivers.id, id),
    with: {
      team: true,
      stints: true,
      lapTimes: true,
    },
  });
};

export const getDriverBySlug = async (slug: string) => {
  return await db.query.drivers.findFirst({
    where: eq(drivers.index, slug),
    with: {
      team: true,
      stints: true,
      lapTimes: true,
    },
  });
};

export const createDriver = async (data: typeof drivers.$inferInsert) => {
  return await db.insert(drivers).values(data).returning();
};

export const updateDriver = async (slug: string, data: Partial<typeof drivers.$inferInsert>) => {
  return await db.update(drivers).set(data).where(eq(drivers.index, slug)).returning();
};

export const deleteDriver = async (slug: string) => {
  return await db.delete(drivers).where(eq(drivers.index, slug)).returning();
};