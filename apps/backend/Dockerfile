# Node runs the Prisma CLI; Bun runs the API.
FROM oven/bun:1.4.2 AS bun
FROM node:22-bookworm-slim AS base
COPY --from=bun /usr/local/bin/bun /usr/local/bin/bun
RUN apt-get update && apt-get install -y --no-install-recommends \
    ca-certificates curl fontconfig libfontconfig1 \
    && rm -rf /var/lib/apt/lists/*
WORKDIR /app

FROM base AS builder
COPY package.json bun.lock ./
COPY apps/backend/package.json ./apps/backend/package.json
COPY apps/frontend/package.json ./apps/frontend/package.json
RUN bun install --frozen-lockfile --filter '@underleaf/backend'
COPY apps/backend ./apps/backend
WORKDIR /app/apps/backend
RUN node node_modules/prisma/build/index.js generate --generator client

FROM base AS tectonic
ARG TARGETARCH
RUN case "$TARGETARCH" in \
      amd64) target=x86_64-unknown-linux-musl; checksum=8533d07f9ccbd7a65824b9e0459041bca34af1eb33daba48f59215593753a3b7 ;; \
      arm64) target=aarch64-unknown-linux-musl; checksum=b10954a95404f3ab2328d2fa59a5ebab8e657f893fab096f98be8db7c0c979b8 ;; \
      *) echo "Unsupported Tectonic architecture: $TARGETARCH" >&2; exit 1 ;; \
    esac \
    && curl -fSL --retry 3 "https://github.com/tectonic-typesetting/tectonic/releases/download/tectonic%400.17.0/tectonic-0.17.0-${target}.tar.gz" -o /tmp/tectonic.tar.gz \
    && echo "$checksum  /tmp/tectonic.tar.gz" | sha256sum -c - \
    && tar -xzf /tmp/tectonic.tar.gz -C /usr/local/bin tectonic \
    && chmod +x /usr/local/bin/tectonic \
    && tectonic --version

FROM base AS runner
ENV NODE_ENV=production PORT=3333 \
    TECTONIC_BIN_PATH=/usr/local/bin/tectonic \
    XDG_CACHE_HOME=/app/apps/backend/storage/cache
COPY --from=builder /app/node_modules /app/node_modules
COPY --from=builder /app/apps/backend /app/apps/backend
COPY --from=tectonic /usr/local/bin/tectonic /usr/local/bin/tectonic
COPY deploy/backend-entrypoint.sh /usr/local/bin/backend-entrypoint
RUN chmod +x /usr/local/bin/backend-entrypoint \
    && mkdir -p /app/apps/backend/storage \
    && chown -R node:node /app/apps/backend/storage
WORKDIR /app/apps/backend
USER node
EXPOSE 3333
ENTRYPOINT ["backend-entrypoint"]
CMD ["bun", "run", "src/index.ts"]
