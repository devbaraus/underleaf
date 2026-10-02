import tailwindcss from '@tailwindcss/vite'
import { devtools } from '@tanstack/devtools-vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import viteReact from '@vitejs/plugin-react'
import { nitro } from 'nitro/vite'
import { defineConfig } from 'vite'

const config = defineConfig({
	plugins: [devtools(), nitro(), tailwindcss(), tanstackStart(), viteReact()],
	resolve: {
		alias: {
			// y-monaco uses the legacy deep import; Monaco 0.57 exports public subpaths.
			'monaco-editor/esm/vs/editor/editor.api.js': 'monaco-editor/editor/editor.api',
		},
	},
	server: {
		port: 3000,
	},
	// These are only reached through dynamic import(), so Vite would discover them late and
	// re-bundle deps mid-session, invalidating modules already loaded (Monaco then throws
	// "InstantiationService has been disposed").
	optimizeDeps: {
		include: [
			'react-pdf',
			'pdfjs-dist',
			'@monaco-editor/react',
			'monaco-editor/editor/editor.api',
			'monaco-editor/editor/contrib/suggest/browser/suggestController',
			'monaco-editor/features/snippet/register',
			'monaco-latex',
			'y-monaco',
		],
	},
})

export default config
