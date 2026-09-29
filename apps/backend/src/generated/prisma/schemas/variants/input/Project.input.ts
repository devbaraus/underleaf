import * as z from 'zod';
// prettier-ignore
export const ProjectInputSchema = z.object({
    id: z.string(),
    title: z.string(),
    description: z.string(),
    ownerId: z.string(),
    template: z.string(),
    compilerEngine: z.string(),
    status: z.string(),
    lastCompiledAt: z.coerce.date().optional().nullable(),
    hasPdf: z.boolean(),
    storageBytes: z.number().int(),
    compilationCount: z.number().int(),
    tags: z.array(z.string()),
    createdAt: z.coerce.date(),
    updatedAt: z.coerce.date(),
    owner: z.unknown(),
    files: z.array(z.unknown()),
    compileLogs: z.array(z.unknown())
}).strict();

export type ProjectInputType = z.infer<typeof ProjectInputSchema>;
