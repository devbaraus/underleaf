FROM oven/bun:1.4.2 AS base

RUN apt-get update && apt-get install -y --no-install-recommends \
    curl \
    openssl \
    ca-certificates \
    fontconfig \
    libfontconfig1 \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

FROM base AS builder

COPY package.json bun.lock* ./
COPY apps/backend/package.json ./apps/backend/

RUN bun install --frozen-lockfile

COPY apps/backend ./apps/backend
COPY bin ./bin

WORKDIR /app/apps/backend

RUN bun run db:generate
RUN bun build --compile --minify-whitespace --minify-syntax --target bun --outfile dist/server src/index.ts

FROM base AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV BUN_INSTALLER_ENV=production

COPY --from=builder /app/apps/backend/dist/server ./server
COPY --from=builder /app/apps/backend/prisma ./prisma
COPY --from=builder /app/apps/backend/src/generated ./src/generated
COPY --from=builder /app/bin ./bin

RUN chmod +x ./server ./bin/tectonic && \
    mkdir -p storage/builds storage/pdf_cache

EXPOSE 3333

CMD ["sh", "-c", "bun --bun prisma db push --skip-generate && ./server"]
