import { eq } from 'drizzle-orm';
import { db } from '@lib/db';
import { teams } from '@lib/schema';

export const getTeams = async () => {
  return await db.select().from(teams).all();
};

export const getTeamById = async (id: string) => {
  return await db.select().from(teams).where(eq(teams.index, id)).get();
};