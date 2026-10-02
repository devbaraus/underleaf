import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/healthz')({
  server: {
    handlers: {
      GET: async ({ request }) => {
        return new Response(JSON.stringify({ status: 'ok' }), {
          headers: {
            'Content-Type': 'application/json',
          },
        })
      },
    },
  },
})