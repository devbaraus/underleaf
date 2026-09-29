import * as z from 'zod';
// prettier-ignore
export const SystemSettingInputSchema = z.object({
    key: z.string(),
    value: z.string(),
    description: z.string(),
    updatedAt: z.coerce.date()
}).strict();

export type SystemSettingInputType = z.infer<typeof SystemSettingInputSchema>;
