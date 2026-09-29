import { Elysia } from 'elysia'

export const ErrorMacro = new Elysia({ name: 'error-macro' }).onError(({ error, code, set }) => {
  if (code === 'VALIDATION') {
    set.status = 400
    return {
      success: false,
      code: 'VALIDATION_ERROR',
      message: (error as any)?.message || 'Erro de validação',
    }
  }

  if (code === 'NOT_FOUND') {
    set.status = 404
    return {
      success: false,
      code: 'NOT_FOUND',
      message: 'Recurso não encontrado',
    }
  }

  const status = (error as any)?.status || 500
  set.status = status
  return {
    success: false,
    code: (error as any)?.code || 'INTERNAL_ERROR',
    message: (error as any)?.message || 'Erro interno no servidor',
  }
})
