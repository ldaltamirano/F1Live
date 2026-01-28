import { eq } from 'drizzle-orm';
import { db } from '@lib/db';
import { drivers } from '@lib/schema';

export const getDrivers = async () => {
  return await db.select().from(drivers).all();
};

export const getDriverById = async (id: string) => {
  return await db.select().from(drivers).where(eq(drivers.id, id)).get();
};