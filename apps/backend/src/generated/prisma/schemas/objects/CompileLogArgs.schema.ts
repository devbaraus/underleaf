import * as z from 'zod';
import { CompileLogSelectObjectSchema as CompileLogSelectObjectSchema } from './CompileLogSelect.schema';
import { CompileLogIncludeObjectSchema as CompileLogIncludeObjectSchema } from './CompileLogInclude.schema'

const makeSchema = () => z.object({
  select: z.lazy(() => CompileLogSelectObjectSchema).optional(),
  include: z.lazy(() => CompileLogIncludeObjectSchema).optional()
}).strict();
export const CompileLogArgsObjectSchema = makeSchema();
export const CompileLogArgsObjectZodSchema = makeSchema();
