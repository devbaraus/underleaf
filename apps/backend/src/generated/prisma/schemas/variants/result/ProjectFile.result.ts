import * as z from 'zod';
// prettier-ignore
export const ProjectFileResultSchema = z.object({
    id: z.string(),
    projectId: z.string(),
    name: z.string(),
    path: z.string(),
    content: z.string(),
    isMain: z.boolean(),
    type: z.string(),
    sizeBytes: z.number().int(),
    createdAt: z.date(),
    updatedAt: z.date(),
    project: z.unknown()
}).strict();

export type ProjectFileResultType = z.infer<typeof ProjectFileResultSchema>;
