#!/bin/sh
set -eu

mkdir -p /app/data/uploads/applications /app/public/uploads/cms

if [ ! -f /app/data/cms-content.json ] && [ -f /app/seed-data/cms-content.json ]; then
  cp /app/seed-data/cms-content.json /app/data/cms-content.json
fi

if [ ! -f /app/data/job-applications.json ]; then
  printf '[]\n' > /app/data/job-applications.json
fi

if [ -d /app/seed-uploads ] && [ -z "$(find /app/public/uploads -mindepth 1 -maxdepth 1 2>/dev/null)" ]; then
  cp -R /app/seed-uploads/. /app/public/uploads/
fi

exec "$@"
