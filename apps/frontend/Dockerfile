FROM oven/bun:1.4.2 AS builder
WORKDIR /app
COPY package.json bun.lock ./
COPY apps/backend/package.json ./apps/backend/package.json
COPY apps/frontend/package.json ./apps/frontend/package.json
RUN bun install --frozen-lockfile --filter '@underleaf/frontend'
COPY apps/frontend ./apps/frontend
WORKDIR /app/apps/frontend
# Empty means same-origin API requests through the proxy.
ARG VITE_API_URL=""
ENV VITE_API_URL=$VITE_API_URL
RUN bun run build

FROM oven/bun:1.4.2 AS runner
WORKDIR /app
ENV NODE_ENV=production NITRO_PORT=3000 NITRO_HOST=0.0.0.0
COPY --from=builder --chown=bun:bun /app/apps/frontend/.output ./
USER bun
EXPOSE 3000
CMD ["bun", "server/index.mjs"]
