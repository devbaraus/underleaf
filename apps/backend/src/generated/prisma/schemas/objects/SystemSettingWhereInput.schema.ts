import * as z from 'zod';
import type { Prisma } from '../../browser';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema'

const systemsettingwhereinputSchema = z.object({
  AND: z.union([z.lazy(() => SystemSettingWhereInputObjectSchema), z.lazy(() => SystemSettingWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => SystemSettingWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => SystemSettingWhereInputObjectSchema), z.lazy(() => SystemSettingWhereInputObjectSchema).array()]).optional(),
  key: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  value: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  description: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional()
}).strict();
export const SystemSettingWhereInputObjectSchema: z.ZodType<Prisma.SystemSettingWhereInput> = systemsettingwhereinputSchema as unknown as z.ZodType<Prisma.SystemSettingWhereInput>;
export const SystemSettingWhereInputObjectZodSchema = systemsettingwhereinputSchema;
