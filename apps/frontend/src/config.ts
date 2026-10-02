export const appConfig = {
	name: 'Underleaf',
	apiUrl:
		typeof window !== 'undefined'
			? ((window as any).__UNDERLEAF_API_URL__ ??
				import.meta.env.VITE_API_URL ??
				'http://localhost:3333')
			: (process.env.INTERNAL_API_URL ?? process.env.VITE_API_URL ?? 'http://localhost:3333'),
}
