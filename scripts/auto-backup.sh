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
  pg_dump -h backend-db -U "$ORTHANC_USERNAME" -d orthanc --clean --if-exists > /backups/last/orthanc-$DATE.sql
  
  # 2. Backup App DB
  echo "Backing up App DB..."
  export PGPASSWORD="$DB_PASSWORD"
  pg_dump -h app-db -U "$DB_USER" -d "$DB_NAME" --clean --if-exists > /backups/last/pacsweb-$DATE.sql

  # 3. Clean and Gzip
  echo "Cleaning and compressing..."
  find /backups/last -name "*.sql" -type f | while read f; do
    sed -i '5d' "$f"
    gzip -f "$f"
    
    # Update latest symlinks
    DIR=$(dirname "$f")
    BASE=$(basename "$f" .sql)
    if echo "$BASE" | grep -q "orthanc"; then
      ln -sf "$BASE.sql.gz" "$DIR/orthanc-latest.sql.gz"
    fi
    if echo "$BASE" | grep -q "pacsweb"; then
      ln -sf "$BASE.sql.gz" "$DIR/pacsweb-latest.sql.gz"
    fi
  done

  echo "Backup cycle complete. Waiting for next schedule..."
  sleep 86400 # Run once a day (you can change this to 3600 for hourly)
done
