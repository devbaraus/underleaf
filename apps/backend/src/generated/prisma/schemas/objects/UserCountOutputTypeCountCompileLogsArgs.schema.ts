import * as z from 'zod';
import { CompileLogWhereInputObjectSchema as CompileLogWhereInputObjectSchema } from './CompileLogWhereInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => CompileLogWhereInputObjectSchema).optional()
}).strict();
export const UserCountOutputTypeCountCompileLogsArgsObjectSchema = makeSchema();
export const UserCountOutputTypeCountCompileLogsArgsObjectZodSchema = makeSchema();
