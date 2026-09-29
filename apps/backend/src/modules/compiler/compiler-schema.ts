import { z } from 'zod'

export const compileBodySchema = z.object({
  unsavedFiles: z
    .array(
      z.object({
        path: z.string().min(1),
        content: z.string(),
      }),
    )
    .optional(),
})

export type CompileBody = z.infer<typeof compileBodySchema>
