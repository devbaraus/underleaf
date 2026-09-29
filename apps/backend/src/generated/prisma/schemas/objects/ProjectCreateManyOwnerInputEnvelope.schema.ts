import * as z from 'zod';
import type { Prisma } from '../../browser';
import { ProjectCreateManyOwnerInputObjectSchema as ProjectCreateManyOwnerInputObjectSchema } from './ProjectCreateManyOwnerInput.schema'

const makeSchema = () => z.object({
  data: z.union([z.lazy(() => ProjectCreateManyOwnerInputObjectSchema), z.lazy(() => ProjectCreateManyOwnerInputObjectSchema).array()]),
  skipDuplicates: z.boolean().optional()
}).strict();
export const ProjectCreateManyOwnerInputEnvelopeObjectSchema: z.ZodType<Prisma.ProjectCreateManyOwnerInputEnvelope> = makeSchema() as unknown as z.ZodType<Prisma.ProjectCreateManyOwnerInputEnvelope>;
export const ProjectCreateManyOwnerInputEnvelopeObjectZodSchema = makeSchema();
