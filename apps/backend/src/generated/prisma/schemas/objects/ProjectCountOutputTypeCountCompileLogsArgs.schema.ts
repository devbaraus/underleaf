import * as z from 'zod';
import { CompileLogWhereInputObjectSchema as CompileLogWhereInputObjectSchema } from './CompileLogWhereInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => CompileLogWhereInputObjectSchema).optional()
}).strict();
export const ProjectCountOutputTypeCountCompileLogsArgsObjectSchema = makeSchema();
export const ProjectCountOutputTypeCountCompileLogsArgsObjectZodSchema = makeSchema();
