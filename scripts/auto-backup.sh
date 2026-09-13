#!/bin/sh

# Pastikan folder ada
mkdir -p /backups/last

# Fallback values if environment variables are not set (for backward compatibility)
: "${ORTHANC_USERNAME:=quantum}"
: "${DB_USER:=pacsuser}"
: "${DB_NAME:=pacsweb}"

while true; do
  DATE=$(date +%Y%m%d-%H%M%S)
  echo "[$DATE] Starting consolidated backup process..."

  # Wait for databases to be ready (as a safety measure)
  echo "Waiting for backend-db to be ready..."
  while ! pg_isready -h backend-db -U "$ORTHANC_USERNAME" -d orthanc > /dev/null 2>&1; do sleep 2; done
  
  echo "Waiting for app-db to be ready..."
  while ! pg_isready -h app-db -U "$DB_USER" -d "$DB_NAME" > /dev/null 2>&1; do sleep 2; done

  # 1. Backup Orthanc DB
  echo "Backing up Orthanc DB..."
  export PGPASSWORD="$ORTHANC_PASSWORD"
  pg_dump -h backend-db -U "$ORTHANC_USERNAME" -d orthanc --clean --if-exists | sed '5d' | gzip > /backups/last/orthanc-$DATE.sql.gz
  ln -sf orthanc-$DATE.sql.gz /backups/last/orthanc-latest.sql.gz
  
  # 2. Backup App DB
  echo "Backing up App DB..."
  export PGPASSWORD="$DB_PASSWORD"
  pg_dump -h app-db -U "$DB_USER" -d "$DB_NAME" --clean --if-exists | sed '5d' | gzip > /backups/last/pacsweb-$DATE.sql.gz
  ln -sf pacsweb-$DATE.sql.gz /backups/last/pacsweb-latest.sql.gz

  echo "Backup cycle complete. Waiting for next schedule..."
  sleep 604800 # Run once a week
done
