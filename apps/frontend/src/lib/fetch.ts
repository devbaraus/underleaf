import { createFetch } from '@better-fetch/fetch'

import { betterFetchSchema } from '#/generated/kubb/betterFetchSchema'

export const $fetch = createFetch({
	baseURL: `http://localhost:3333/v1/`,
	credentials: 'include',
	throw: true,
	retry: 0,
	disableValidation: true,
	schema: betterFetchSchema,
})
