import * as z from 'zod';
export const SystemSettingDeleteResultSchema = z.nullable(z.object({
  key: z.string(),
  value: z.string(),
  description: z.string(),
  updatedAt: z.date()
}));