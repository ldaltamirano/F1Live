import { db } from '@lib/db';
import { teams } from '@lib/schema';
import { eq } from 'drizzle-orm';

export const getAllTeams = async () => {
  return await db.query.teams.findMany({
    with: {
      drivers: true
    }
  });
}

export const getTeamBySlug = async (slug: string) => {
    return await db.query.teams.findFirst({
        where: eq(teams.index, slug),
        with: {
            drivers: true
        }
    })
}