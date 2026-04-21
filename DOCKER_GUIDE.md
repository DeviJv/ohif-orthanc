# Panduan Lengkap Docker untuk Quantum PACS (Edisi Pemula)

Dokumen ini ditulis khusus agar kamu bisa langsung *jago* mengatasi urusan membelah aplikasi, *build* Image, sampai *push* aplikasi Quantum PACS ke awan (Docker Hub).

Mari kita mulai perlahan! 🚀

---

## 1. Konsep Dasar (Wajib Tahu)
Biar ngga pusing, ingat 3 arti kata ini saja:
*   **Image**: Ini adalah "master cetakan" atau "DVD installer" aplikasimu. Di dalam sini OS, kodingan, dan pengaturan semua sudah di-kunci.
*   **Container**: Ini adalah aplikasi yang "sedang nyala" berdasarkan dari *Image* di atas. Satu *Image* bisa dijalankan jadi 100 *Container*.
*   **Docker Hub / Registry**: Ini ibarat "Google Drive" atau "App Store" khusus untuk *Image*. Tempat kamu nyimpan *Image* agar server VPS gampang mengunduhnya.

---

## 2. Cara Login ke Docker Hub
Sebelum kamu bisa melempar aplikasimu ke internet, kamu harus *login* mesin Mac kamu ke akun Docker Hub.

Buka terminal dan ketik:
```bash
docker login
```
*(Masukkan Username dan Password portal Docker Hub kamu. Jika sukses, akan muncul tulisan `Login Succeeded`)*.

---

## 3. Cara Membelah Alur Build (Split Build)
Karena aplikasi ini arsitekturnya besar, kita pecah menjadi 2 master cetakan (*Image*):
1. **Quantum Web** (Aplikasi Frontend & PACS Dasboard)
2. **AI Engine** (Server deteksi kecerdasan buatan)

Kita perlu membuat (*Build*) Image-nya satu per satu dari folder utama `ohif-orthanc`:

**A. Membuat Image Quantum Web**
*(Digunakan struktur: `docker build -t namadockerhubkamu/nama-aplikasi:versinya foldernya`)*
```bash
docker build -t username_dockerhub_kamu/quantum-web:latest ./frontend
```

**B. Membuat Image AI Engine**
```bash
docker build -t username_dockerhub_kamu/ai-engine:latest ./backend-ai
```
*(Ingat ganti kalimat `username_dockerhub_kamu` dengan *Username* aslimu)*.

---

## 4. Cara Push (Upload) ke Docker Hub
Setelah proses *build* di atas selesai (100%), cetakan aplikasimu masih tersimpan di laptop Mac-mu. Sekarang kirim ke awan:

```bash
docker push username_dockerhub_kamu/quantum-web:latest
docker push username_dockerhub_kamu/ai-engine:latest
```
*(Tunggu antrian upload sampai selesai. Bergantung pada kecepatan internetmu)*.

Selamat! Sampai di sini, kapanpun server Production (VPS) kamu di-nyalakan, VPS hanya perlu men-download gambar dari awan tanpa perlu mikirin rumitnya *coding*.

---

## 🧰 Cheat Sheet: Perintah Docker Harari-hari (Sangat Berguna)
Berikut adalah "mantra sihir" yang wajib dikuasai seorang administrator:

### A. Melihat Status
*   **`docker ps`**
    Melihat daftar Container yang *sedang menyala* saat ini.
*   **`docker ps -a`**
    Melihat *semua* daftar Container, termasuk yang lagi mati/error.
*   **`docker image ls`**
    Melihat daftar *Image* (Installer) apa saja yang menuhin Harddisk kamu.

### B. Membaca Pesan Error (Debugging)
Kalau ada aplikasi yang "Macet" atau "Loading Terus", cek jeroannya:
*   **`docker logs quantum-web`** 
    Melihat error spesifik dari aplikasi web.
*   **`docker logs -f orthanc-backend`** 
    Melihat log DICOM Server secara *realtime* (nyala terus gak putus-putus). Tekan `CTRL + C` untuk keluar.

### C. Masuk Ke Dalam "Mesin" Container (nge-Hack di dalam)
Kalau kamu pingin nge-cek apakah database sudah kesambung atau file ada di dalam:
*   **`docker exec -it quantum-web sh`** 
    Membuka terminal shell `sh` KHUSUS Tembus masuk ke dalam container Quantum Web.
*   **`docker exec -it backend-db bash`** 
    Masuk ke terminal dari mesin database.

### D. Menghapus / Membersihkan Ruang
Makin lama dipakai, sisa ampas Docker bisa menuhin memori Mac/VPS kamu.
*   **`docker compose down`** 
    Mematikan seluruh sistem PACS dengan mulus (gak cuma di*pause*).
*   **`docker compose down -v`** 
    Mematikan seluruh sistem PACS **DAN MENGHAPUS SEMUA ISI DATABASE**. Barhati-hatilah dengan flag `-v` !!
*   **`docker system prune -a`**
    **Perintah Sapu Jagat**: Menghapus SEMUA container mati, cache, dan images usang. Cukup jalankan sebulan sekali agar harddisk VPS tidak penuh.
