#!/bin/sh

echo "⏳ Menyiapkan Database..."

# Memastikan kita menggunakan versi prisma yang sama dengan package.json
echo "➜ Sinkronisasi Schema Database..."
# Menggunakan migrate deploy untuk keamanan production (tidak menghapus data)
npx prisma@6.19.2 migrate deploy --schema=prisma/schema.prisma

echo "➜ Menjalankan Seed Database (RBAC System)..."
node prisma/seed.js

echo "✅ Database siap! Memulai Aplikasi Quantum Web..."
exec "$@"
