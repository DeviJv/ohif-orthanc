# VPS Deployment Guide (Ubuntu 24.04)

Ikuti langkah-langkah ini untuk deploy Quantum PACS ke VPS Ubuntu 24.04 Anda.

---

## 1. Persiapan VPS

Jalankan perintah ini di VPS untuk install Docker dan Certbot:

```bash
sudo apt update && sudo apt install -y docker.io docker-compose-v2 git certbot
sudo usermod -aG docker $USER
```

---

## 2. Hubungkan Domain

Pastikan A-Record domain Anda (misal: `pacs.domainanda.com`) sudah mengarah ke IP VPS.

---

## 3. Clone & Konfigurasi

```bash
# Clone repo (Lakukan di VPS)
cd /var/www/
git clone <url-repo-anda> ohif-orthanc
cd ohif-orthanc

# Opsional: Jika sudah ada, langsung git pull
git pull
```

**Edit `.env` di VPS:**
```bash
nano .env
```
Set nilai berikut:
- `DOMAIN_NAME`: `pacs.domainanda.com`
- `NEXT_PUBLIC_APP_URL`: `https://pacs.domainanda.com`
- `PROTOCOL`: `https`

---

## 4. Generate SSL (Certbot)

Jalankan ini di VPS **sebelum** menyalakan Docker:

```bash
sudo certbot certonly --standalone -d pacs.domainanda.com
```

---

## 5. Jalankan Stack Produksi

Gunakan perintah ini untuk memicu build mode produksi:

```bash
docker compose -f docker-compose.yml -f docker-compose.prod.yml up -d --build
```

---

## 6. Sinkronisasi Database

Setelah container jalan (`Started`), jalankan perintah ini satu kali:

```bash
docker exec pacs-web npx prisma db push
```

---

## Troubleshooting

- **Cek Log**: `docker compose logs -f`
- **Restart Nginx**: `docker compose restart nginx`
- **Error Network**: Jika muncul error "network pacs not found", jalankan `docker network create pacs` secara manual.
