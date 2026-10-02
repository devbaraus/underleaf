import { createFetch } from '@better-fetch/fetch'

import { betterFetchSchema } from '#/generated/kubb/betterFetchSchema'
import { appConfig } from '#/config'

export const $fetch = createFetch({
	baseURL: `${appConfig.apiUrl}/api/`,
	credentials: 'include',
	throw: true,
	retry: 0,
	disableValidation: true,
	schema: betterFetchSchema,
})
