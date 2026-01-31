import { eq } from 'drizzle-orm';
import { db } from '@lib/db';
import { permissions } from '@lib/schema';

export const getAllPermissions = async () => {
  return await db.query.permissions.findMany({
    with: {
      users: true,
    },
  });
};

export const getPermissionById = async (id: number) => {
  return await db.query.permissions.findFirst({
    where: eq(permissions.id, id),
    with: {
      users: true,
    },
  });
};

export const createPermission = async (data: typeof permissions.$inferInsert) => {
  return await db.insert(permissions).values(data).returning();
};

export const updatePermission = async (id: number, data: Partial<typeof permissions.$inferInsert>) => {
  return await db.update(permissions).set(data).where(eq(permissions.id, id)).returning();
};

export const deletePermission = async (id: number) => {
  return await db.delete(permissions).where(eq(permissions.id, id)).returning();
};