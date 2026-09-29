import * as z from 'zod';
// prettier-ignore
export const CompileLogInputSchema = z.object({
    id: z.string(),
    projectId: z.string(),
    userId: z.string(),
    success: z.boolean(),
    durationMs: z.number().int(),
    errors: z.unknown(),
    rawOutput: z.string(),
    engine: z.string(),
    createdAt: z.coerce.date(),
    project: z.unknown(),
    user: z.unknown()
}).strict();

export type CompileLogInputType = z.infer<typeof CompileLogInputSchema>;
