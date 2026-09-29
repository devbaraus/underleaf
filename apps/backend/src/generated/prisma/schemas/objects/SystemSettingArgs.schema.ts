import * as z from 'zod';
import { SystemSettingSelectObjectSchema as SystemSettingSelectObjectSchema } from './SystemSettingSelect.schema'

const makeSchema = () => z.object({
  select: z.lazy(() => SystemSettingSelectObjectSchema).optional()
}).strict();
export const SystemSettingArgsObjectSchema = makeSchema();
export const SystemSettingArgsObjectZodSchema = makeSchema();
