import * as z from 'zod';
// prettier-ignore
export const SystemSettingResultSchema = z.object({
    key: z.string(),
    value: z.string(),
    description: z.string(),
    updatedAt: z.date()
}).strict();

export type SystemSettingResultType = z.infer<typeof SystemSettingResultSchema>;
