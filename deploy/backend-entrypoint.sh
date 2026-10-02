#!/bin/sh
set -eu
# Deploy applies checked-in migrations; never accepts destructive schema changes.
node node_modules/prisma/build/index.js migrate deploy
exec "$@"
