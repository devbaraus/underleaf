import * as z from 'zod';
export const SystemSettingUpdateResultSchema = z.nullable(z.object({
  key: z.string(),
  value: z.string(),
  description: z.string(),
  updatedAt: z.date()
}));