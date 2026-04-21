#!/bin/sh

# Automated database sync on startup
echo "Syncing database with Prisma schema..."
npx prisma db push --schema=prisma/schema.prisma --accept-data-loss

if [ $? -eq 0 ]; then
  echo "Database is in sync. Seeding data..."
  npx prisma db seed
  echo "Seeding completed. Starting the application..."
else
  echo "Database sync failed. Attempting to start the application anyway..."
fi

# Start the custom CRON worker daemon in the background
echo "Starting Scheduled CRON worker..."
node cron-worker.js &

# Execute the main container command (pnpm start / next start)
exec "$@"
