# Deployment Guide V2 - Quantum PACS

Dokumen ini menjelaskan cara deploy sistem Anda agar terhindar dari error **Unauthorized**, **ECONNREFUSED**, atau **Mismatch Kredensial**.

## 1. Persiapan Kredensial (Wajib Sinkron)

Ada 3 tempat yang harus memiliki nilai yang **SAMA PERSIS**. Jika Anda mengubah salah satu, ubah semuanya.

### A. File `.env`
Pastikan variabel berikut terisi:
```env
ORTHANC_USERNAME=quantum
ORTHANC_PASSWORD=quantum123
ORTHANC_AUTH_BASE64=cXVhbnR1bTpxdWFudHVtMTIz  # Kode Base64 dari 'quantum:quantum123'
```

### B. File `orthanc.json`
Pastikan bagian PostgreSQL dan RegisteredUsers sinkron:
```json
"PostgreSQL": {
    "Username": "quantum",
    "Password": "quantum123"
},
"RegisteredUsers": {
    "quantum": "quantum123"
}
```

### C. File `nginx.conf`
Nginx bekerja sebagai gerbang. Ia harus mengirim kode akses yang sama:
```nginx
proxy_set_header Authorization "Basic cXVhbnR1bTpxdWFudHVtMTIz";
```

---

## 2. Prosedur Deploy / Reset (PENTING)

Sistem Anda menggunakan folder fisik di Mac (`./postgres_data` dan `./app_postgres_data`). Folder ini **tidak otomatis terhapus** oleh Docker. Jika Anda mengubah password atau mau deploy ulang, ikuti urutan ini:

### Langkah 1: Matikan Sistem
```bash
docker compose down
```

### Langkah 2: Hapus Data Lama (Nuclear Option)
> [!CAUTION]
> **PERINGATAN:** Langkah ini akan menghapus semua data rontgen dan user. Lakukan ini hanya saat deploy pertama atau jika ingin reset total karena mismatch password.

```bash
rm -rf ./postgres_data ./app_postgres_data
```

### Langkah 3: Nyalakan Kembali
```bash
docker compose up -d --build
```

---

## 3. Otomatisasi Database & Login

Aplikasi Next.js (`quantum-web`) sudah dikonfigurasi untuk otomatis:
1.  **Migrasi:** Menambah kolom database yang hilang secara otomatis.
2.  **Seeding:** Membuat user admin default setiap kali database kosong.

**Kredensial Admin Default:**
- **Email:** `admin@pacs.com`
- **Password:** `adminpassword`

---

## 4. Tips Mengatasi Error

- **Tampilan "Unauthorized"?** Logout dulu dari website, lalu Login kembali. Ini perlu untuk memperbarui "Session Token" di browser Anda.
- **Dicom Gagal Connect?** Cek Orthanc logs. Jika ada error `password authentication failed`, berarti folder `./postgres_data` perlu dihapus (Langkah 2).
