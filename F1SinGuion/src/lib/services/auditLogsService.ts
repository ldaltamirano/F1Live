import { eq, desc } from 'drizzle-orm';
import { db } from '@lib/db';
import { auditLogs } from '@lib/schema';

export const getAllAuditLogs = async () => {
  return await db.query.auditLogs.findMany({
    orderBy: (auditLogs, { desc }) => [desc(auditLogs.timestamp)],
    with: {
      user: true,
    },
  });
};

export const getAuditLogsByadminId = async (adminId: number) => {
  return await db.query.auditLogs.findMany({
    where: eq(auditLogs.userId, adminId),
    orderBy: (auditLogs, { desc }) => [desc(auditLogs.timestamp)],
  });
};

export const createAuditLog = async (data: typeof auditLogs.$inferInsert) => {
  return await db.insert(auditLogs).values(data).returning();
};