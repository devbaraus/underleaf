import * as z from 'zod';
// prettier-ignore
export const SystemSettingModelSchema = z.object({
    key: z.string(),
    value: z.string(),
    description: z.string(),
    updatedAt: z.date()
}).strict();

export type SystemSettingPureType = z.infer<typeof SystemSettingModelSchema>;
