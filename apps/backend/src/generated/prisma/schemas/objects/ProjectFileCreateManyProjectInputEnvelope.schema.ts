import * as z from 'zod';
import type { Prisma } from '../../browser';
import { ProjectFileCreateManyProjectInputObjectSchema as ProjectFileCreateManyProjectInputObjectSchema } from './ProjectFileCreateManyProjectInput.schema'

const makeSchema = () => z.object({
  data: z.union([z.lazy(() => ProjectFileCreateManyProjectInputObjectSchema), z.lazy(() => ProjectFileCreateManyProjectInputObjectSchema).array()]),
  skipDuplicates: z.boolean().optional()
}).strict();
export const ProjectFileCreateManyProjectInputEnvelopeObjectSchema: z.ZodType<Prisma.ProjectFileCreateManyProjectInputEnvelope> = makeSchema() as unknown as z.ZodType<Prisma.ProjectFileCreateManyProjectInputEnvelope>;
export const ProjectFileCreateManyProjectInputEnvelopeObjectZodSchema = makeSchema();
