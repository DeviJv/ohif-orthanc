# Panduan Backup & Restore Database Quantum PACS

Dokumen ini menjelaskan cara mengelola backup otomatis untuk dua database utama:
1.  **backend-db**: Database Orthanc (Data DICOM/Pasien).
2.  **app-db**: Database Quantum Web (Data User, Report, Log, dll).

---

## 1. Konfigurasi Backup Otomatis

Kedua database ini sudah dikonfigurasi untuk dibackup secara otomatis menggunakan container `backend-backup` dan `app-db-backup`.

### Lokasi File Backup
Semua file backup akan tersimpan di folder:
`./backups` (di direktori utama `ohif-orthanc`)

File akan memiliki format nama:
- `YYYY-MM-DDTHH-mm-ss.sql.gz` (untuk Orthanc)
- `YYYY-MM-DDTHH-mm-ss.sql.gz` (untuk Quantum Web)

### Cara Mengubah Jadwal Backup
Jadwal diatur menggunakan format **Cron** di file `docker-compose.yml` pada variabel `SCHEDULE`.

**Contoh Format:**
- `SCHEDULE=0 0 * * *`  -> Setiap hari jam 00:00 (Tengah malam)
- `SCHEDULE=0 0 * * 0`  -> Setiap hari Minggu jam 00:00 (Default)
- `SCHEDULE=0 */6 * * *` -> Setiap 6 jam sekali

Setelah mengubah `SCHEDULE` di `docker-compose.yml`, jalankan perintah ini agar perubahan diterapkan:
```bash
docker compose up -d
```

---

## 2. Cara Restore (Mengembalikan Data)

Jika terjadi kerusakan data dan Anda ingin mengembalikan data dari file backup, ikuti langkah-langkah berikut:

### Langkah A: Identifikasi File Backup
Cek file di folder `backups/`, pilih tanggal yang ingin Anda restore. Misal: `2026-04-26T00-00-00_orthanc.sql.gz`.

### Langkah B: Proses Restore

Sekarang file backup kembali menggunakan kompresi **`.gz`** untuk menghemat ruang, namun tetap **bersih** dari error. Anda bisa langsung merestore-nya **tanpa perlu unzip manual** ke dalam folder.

**Untuk Orthanc (`backend-db`):**
```bash
gunzip -c backups/last/orthanc-latest.sql.gz | docker exec -i backend-db psql -U quantum -d orthanc
```

**Untuk Quantum Web (`app-db`):**
```bash
gunzip -c backups/last/pacsweb-latest.sql.gz | docker exec -i app-db psql -U pacsuser -d pacsweb
```

> [!TIP]
> Jika ingin menggunakan **TablePlus**, Anda cukup klik kanan file `.sql.gz` tersebut di Finder, lalu **Extract** (unzip) terlebih dahulu agar menjadi file `.sql` biasa sebelum di-import.

> [!IMPORTANT]
> - Perintah di atas akan menimpa data yang ada.
> - Pastikan username (`-U`) dan nama database (`-d`) sesuai dengan yang ada di file `.env`.

---

## 3. Troubleshooting

### Mengapa folder backup kosong?
Jika folder `backups/` kosong:
1.  **Cek apakah Docker sedang berjalan**: Jika Docker Desktop mati, backup tidak akan jalan.
2.  **Cek Log Error**:
    ```bash
    docker compose logs backend-backup
    ```
3.  **Paksa Backup Sekarang**: Saya sudah menambahkan variabel `BACKUP_ON_START=TRUE`. Artinya, setiap kali Anda menjalankan `docker compose up -d`, sistem akan langsung mencoba melakukan backup tanpa menunggu jadwal.

### Cek Status Database
Anda bisa memastikan database aktif dengan:
```bash
docker ps --filter "name=db"
```
