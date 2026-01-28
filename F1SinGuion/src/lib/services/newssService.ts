import { eq, desc } from 'drizzle-orm';
import { db } from '@lib/db';
import { news } from '@lib/schema';

export const getAllNews = async () => {
  return await db.select().from(news).orderBy(desc(news.fecha));
};

export const getNewsById = async (id: string | number) => {
  return await db.select().from(news).where(eq(news.id, Number(id))).get();
};

export const getNewsBySlug = async (slug: string) => {
  return await db.select().from(news).where(eq(news.index, slug)).get();
};

export const createNews = async (data: typeof news.$inferInsert) => {
  return await db.insert(news).values(data).returning();
};

export const updateNews = async (id: string | number, data: Partial<typeof news.$inferInsert>) => {
  return await db.update(news).set(data).where(eq(news.id, Number(id))).returning();
};

export const deleteNews = async (id: string | number) => {
  return await db.delete(news).where(eq(news.id, Number(id))).returning();
};
