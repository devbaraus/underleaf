export const appConfig = {
  name: 'Underleaf',
  apiUrl: (typeof window !== 'undefined' ? (window as any).__UNDERLEAF_API_URL__ : process.env.VITE_API_URL) || 'http://localhost:3333',
}
