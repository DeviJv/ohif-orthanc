#!/bin/sh

# Automated database sync on startup
echo "Syncing database with Prisma schema..."
npx prisma db push

# Check if the sync was successful
if [ $? -eq 0 ]; then
  echo "Database is in sync. Starting the application..."
else
  echo "Database sync failed. Attempting to start the application anyway..."
fi

# Execute the main container command (pnpm start)
exec "$@"
