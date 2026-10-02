#!/bin/sh
set -eu
if [ ! -d "/app/apps/backend/storage/cache/tectonic" ] && [ -d "/app/tectonic-cache-seed" ]; then
  mkdir -p /app/apps/backend/storage/cache/tectonic
  cp -rn /app/tectonic-cache-seed/* /app/apps/backend/storage/cache/tectonic/ || true
fi
# Deploy applies checked-in migrations; never accepts destructive schema changes.
node node_modules/prisma/build/index.js migrate deploy
exec "$@"
