import * as z from 'zod';
// prettier-ignore
export const CompileLogResultSchema = z.object({
    id: z.string(),
    projectId: z.string(),
    userId: z.string(),
    success: z.boolean(),
    durationMs: z.number().int(),
    errors: z.unknown(),
    rawOutput: z.string(),
    engine: z.string(),
    createdAt: z.date(),
    project: z.unknown(),
    user: z.unknown()
}).strict();

export type CompileLogResultType = z.infer<typeof CompileLogResultSchema>;
