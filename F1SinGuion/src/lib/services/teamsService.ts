import { eq } from 'drizzle-orm';
import { db } from '@lib/db';
import { teams } from '@lib/schema';

export const getAllTeams = async () => {
  return await db.query.teams.findMany({
    with: {
      drivers: true,
    },
  });
};

export const getTeamBySlug = async (slug: string) => {
  return await db.query.teams.findFirst({
    where: eq(teams.index, slug),
    with: {
      drivers: true,
    },
  });
};

export const createTeam = async (data: typeof teams.$inferInsert) => {
  return await db.insert(teams).values(data).returning();
};

export const updateTeam = async (slug: string, data: Partial<typeof teams.$inferInsert>) => {
  return await db.update(teams).set(data).where(eq(teams.index, slug)).returning();
};

export const deleteTeam = async (slug: string) => {
  return await db.delete(teams).where(eq(teams.index, slug)).returning();
};