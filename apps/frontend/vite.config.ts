import { defineConfig } from 'vite'
import { devtools } from '@tanstack/devtools-vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import viteReact from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { nitro } from 'nitro/vite'

const config = defineConfig({
  plugins: [
    devtools(),
    nitro(),
    tailwindcss(),
    tanstackStart(),
    viteReact(),
  ],
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
      'monaco-latex',
    ],
  },
})

export default config
