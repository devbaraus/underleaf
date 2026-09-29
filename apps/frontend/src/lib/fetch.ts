export const $fetch = createFetch({
  baseURL: `http://localhost:3333/v1/`,
  credentials: 'include',
  throw: true,
  retry: 0,
  disableValidation: true,
  errorSchema: errorResponseSchemaSchema,
  schema: betterFetchSchema,
})
