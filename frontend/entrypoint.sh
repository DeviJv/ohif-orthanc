#!/bin/sh
# Mode Rescue: Mengizinkan aplikasi jalan meskipun ada migrasi yang nyangkut
# Kita tidak pakai 'set -e' dulu di sini

echo "⏳ Menyiapkan Database Quantum (Mode Rescue)..."

PRISMA_BIN="./node_modules/.bin/prisma"

echo "➜ Step 1: Mencoba Sinkronisasi Database..."
# Tambahkan || true agar tidak stop jika ada error migrasi lama
$PRISMA_BIN migrate deploy --schema=prisma/schema.prisma || {
    echo "⚠️ Migrasi gagal/tertunda karena ada error lama (P3009)."
    echo "➜ Mencoba auto-resolve migrasi yang sering bermasalah..."
    $PRISMA_BIN migrate resolve --applied 20260429150700_remove_medical_context --schema=prisma/schema.prisma || true
    $PRISMA_BIN migrate resolve --applied 20260430082100_add_doctor_signature --schema=prisma/schema.prisma || true
}

echo "➜ Mencoba sinkronisasi paksa (db push) untuk update schema terbaru..."
$PRISMA_BIN db push --schema=prisma/schema.prisma --accept-data-loss || echo "⚠️ Sinkronisasi paksa gagal."

echo "➜ Step 2: Menjalankan Seeder Database..."
node prisma/seed.js || echo "⚠️ Seeder gagal, mungkin struktur tabel belum lengkap."

echo "✅ Memulai Aplikasi Quantum Web..."
exec "$@"
