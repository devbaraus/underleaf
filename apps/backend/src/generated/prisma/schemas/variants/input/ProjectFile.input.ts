import * as z from 'zod';
// prettier-ignore
export const ProjectFileInputSchema = z.object({
    id: z.string(),
    projectId: z.string(),
    name: z.string(),
    path: z.string(),
    content: z.string(),
    isMain: z.boolean(),
    type: z.string(),
    sizeBytes: z.number().int(),
    createdAt: z.coerce.date(),
    updatedAt: z.coerce.date(),
    project: z.unknown()
}).strict();

export type ProjectFileInputType = z.infer<typeof ProjectFileInputSchema>;
