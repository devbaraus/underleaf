import { z } from 'zod'

export const createProjectSchema = z.object({
  title: z.string().min(1, 'Título é obrigatório'),
  description: z.string().optional().default(''),
  template: z.enum(['academic-paper', 'blank', 'beamer', 'cv']).optional().default('academic-paper'),
})

export const updateProjectSchema = z.object({
  title: z.string().min(1).optional(),
  description: z.string().optional(),
})

export const createFileSchema = z.object({
  path: z.string().min(1, 'Caminho do arquivo é obrigatório'),
  name: z.string().min(1, 'Nome do arquivo é obrigatório'),
  content: z.string().optional().default(''),
  isMain: z.boolean().optional().default(false),
  type: z.string().optional().default('tex'),
})

export const updateFileSchema = z.object({
  content: z.string(),
})

export type CreateProjectInput = z.infer<typeof createProjectSchema>
export type UpdateProjectInput = z.infer<typeof updateProjectSchema>
export type CreateFileInput = z.infer<typeof createFileSchema>
export type UpdateFileInput = z.infer<typeof updateFileSchema>
