import * as z from 'zod';
import type { Prisma } from '../../browser';
import { StringWithAggregatesFilterObjectSchema as StringWithAggregatesFilterObjectSchema } from './StringWithAggregatesFilter.schema';
import { DateTimeWithAggregatesFilterObjectSchema as DateTimeWithAggregatesFilterObjectSchema } from './DateTimeWithAggregatesFilter.schema'

const systemsettingscalarwherewithaggregatesinputSchema = z.object({
  AND: z.union([z.lazy(() => SystemSettingScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => SystemSettingScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => SystemSettingScalarWhereWithAggregatesInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => SystemSettingScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => SystemSettingScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  key: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  value: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  description: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeWithAggregatesFilterObjectSchema), z.coerce.date()]).optional()
}).strict();
export const SystemSettingScalarWhereWithAggregatesInputObjectSchema: z.ZodType<Prisma.SystemSettingScalarWhereWithAggregatesInput> = systemsettingscalarwherewithaggregatesinputSchema as unknown as z.ZodType<Prisma.SystemSettingScalarWhereWithAggregatesInput>;
export const SystemSettingScalarWhereWithAggregatesInputObjectZodSchema = systemsettingscalarwherewithaggregatesinputSchema;
