import * as z from 'zod';
export const SystemSettingFindManyResultSchema = z.object({
  data: z.array(z.object({
  key: z.string(),
  value: z.string(),
  description: z.string(),
  updatedAt: z.date()
})),
  pagination: z.object({
  page: z.number().int().min(1),
  pageSize: z.number().int().min(1),
  total: z.number().int().min(0),
  totalPages: z.number().int().min(0),
  hasNext: z.boolean(),
  hasPrev: z.boolean()
})
});