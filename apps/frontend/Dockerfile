FROM oven/bun:1.4.2 AS base

WORKDIR /app

FROM base AS builder

COPY package.json bun.lock* ./
COPY apps/frontend/package.json ./apps/frontend/

RUN bun install --frozen-lockfile

COPY apps/frontend ./apps/frontend

WORKDIR /app/apps/frontend

RUN bun run generate-routes
RUN bun run build

FROM base AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

COPY --from=builder /app/apps/frontend/.output ./

EXPOSE 3000

CMD ["bun", "server/index.mjs"]
