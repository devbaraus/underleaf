import * as z from 'zod';
export const SystemSettingFindUniqueResultSchema = z.nullable(z.object({
  key: z.string(),
  value: z.string(),
  description: z.string(),
  updatedAt: z.date()
}));