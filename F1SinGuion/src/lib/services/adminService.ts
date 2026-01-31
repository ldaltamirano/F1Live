import { eq } from 'drizzle-orm';
import { db } from '@lib/db';
import { admin } from '@lib/schema';

export const getAllAdmins = async () => {
  return await db.query.admin.findMany({
    with: {
      permission: true,
    },
  });
};

export const getAdminById = async (id: number) => {
  return await db.query.admin.findFirst({
    where: eq(admin.id, id),
    with: {
      permission: true,
      auditLogs: true,
    },
  });
};

export const getAdminByUsername = async (username: string) => {
  return await db.query.admin.findFirst({
    where: eq(admin.username, username),
    with: {
      permission: true,
    },
  });
};

export const createAdmin = async (data: typeof admin.$inferInsert) => {
  return await db.insert(admin).values(data).returning();
};

export const updateAdmin = async (id: number, data: Partial<typeof admin.$inferInsert>) => {
  return await db.update(admin).set(data).where(eq(admin.id, id)).returning();
};

export const deleteAdmin = async (id: number) => {
  return await db.delete(admin).where(eq(admin.id, id)).returning();
};