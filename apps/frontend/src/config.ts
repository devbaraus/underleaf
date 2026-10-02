export const appConfig = {
	name: 'Underleaf',
	apiUrl:
		typeof window !== 'undefined'
			? (import.meta.env.VITE_API_URL ||
				(window.location.port === '3000' ? 'http://localhost:3333' : ''))
			: (process.env.INTERNAL_API_URL ?? process.env.VITE_API_URL ?? 'http://backend:3333'),
}
