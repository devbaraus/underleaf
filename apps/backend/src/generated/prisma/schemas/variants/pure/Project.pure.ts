import * as z from 'zod';
// prettier-ignore
export const ProjectModelSchema = z.object({
    id: z.string(),
    title: z.string(),
    description: z.string(),
    ownerId: z.string(),
    template: z.string(),
    compilerEngine: z.string(),
    status: z.string(),
    lastCompiledAt: z.date().nullable(),
    hasPdf: z.boolean(),
    storageBytes: z.number().int(),
    compilationCount: z.number().int(),
    tags: z.array(z.string()),
    createdAt: z.date(),
    updatedAt: z.date(),
    owner: z.unknown(),
    files: z.array(z.unknown()),
    compileLogs: z.array(z.unknown())
}).strict();

export type ProjectPureType = z.infer<typeof ProjectModelSchema>;
