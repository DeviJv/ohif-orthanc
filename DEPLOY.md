# Quantum PACS - VPS Deployment Guide

## Prerequisites

1. **VPS with Docker & Docker Compose installed**
2. **Domain name** (poin ke VPS IP)
3. **SSL Certificates** (letsencrypt)

---

## Step 1: Prepare Environment

### Edit `.env` File

```bash
# Protocol - GANTI KE HTTPS
PROTOCOL=https

# Domain Anda
DOMAIN_NAME=your-domain.com

# App URL - GANTI KE HTTPS + Domain (PENTING: tanpa port)
NEXT_PUBLIC_APP_URL=https://your-domain.com
NEXT_PUBLIC_ORTHANC_URL=https://your-domain.com/orthanc/

# Database (sesuaikan jika perlu)
DB_USER=pacsuser
DB_PASSWORD=pacspassword
DB_NAME=pacsweb

# Orthanc Credentials
ORTHANC_USERNAME=quantum
ORTHANC_PASSWORD=quantum123
ORTHANC_AUTH_BASE64=cXVhbnR1bTpxdWFudHVtMTIz

# Telegram (optional)
TELEGRAM_BOT_TOKEN=your_bot_token
TELEGRAM_CHAT_ID=your_chat_id
```

**PENTING:** 
- `NEXT_PUBLIC_APP_URL` harus menggunakan domain (contoh: `https://your-domain.com`) - TANPA port
- Semua link (Telegram, viewer, dll) menggunakan `NEXT_PUBLIC_APP_URL` sebagai base

---

## Step 2: Setup SSL Certificates

### Option A: Manual Letsencrypt

```bash
# Install certbot
sudo apt install certbot

# Generate SSL certificates
sudo certbot certonly --standalone -d your-domain.com

# Verify certificates
ls -la /etc/letsencrypt/live/your-domain.com/
```

### Option B: Auto-renewal Script

Buat script `/root/renew-ssl.sh`:

```bash
#!/bin/bash
certbot certonly --standalone -d your-domain.com --renew-by-default
docker exec pacs-gateway nginx -s reload
```

Add to crontab:
```bash
crontab -e
# Add line:
0 3 * * * /root/renew-ssl.sh >> /var/log/ssl-renew.log 2>&1
```

---

## Step 3: Update Nginx Config for HTTPS

Edit `nginx.conf` - Tambahkan HTTPS server block:

```nginx
server {
    listen 443 ssl http2;
    server_name _;

    ssl_certificate     /etc/nginx/ssl/live/${DOMAIN_NAME}/fullchain.pem;
    ssl_certificate_key /etc/nginx/ssl/live/${DOMAIN_NAME}/privkey.pem;
    ssl_protocols       TLSv1.2 TLSv1.3;
    ssl_ciphers         HIGH:!aNULL:!MD5;

    client_max_body_size 500M;
    proxy_read_timeout 300s;
    proxy_connect_timeout 300s;
    proxy_send_timeout 300s;

    add_header Cross-Origin-Opener-Policy "same-origin" always;
    add_header Cross-Origin-Embedder-Policy "require-corp" always;
    add_header Cross-Origin-Resource-Policy "cross-origin" always;

    # OHIF Viewer SPA
    location /ohif/ {
        proxy_pass http://viewer:80/;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }

    # OHIF assets
    location ~* ^/(app.*\.js|app.*\.css|init-service-worker\.js|.*\.wasm|manifest\.json|sw\.js|assets/.*|[0-9]+\..*\.js|[0-9]+\.css)$ {
        proxy_pass http://viewer:80;
        proxy_set_header Host $host;
    }

    # Frontend
    location / {
        proxy_pass http://quantum-web:3001;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto https;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }

    # SSE
    location /api/events {
        proxy_pass http://quantum-web:3001;
        proxy_set_header Host $host;
        proxy_http_version 1.1;
        proxy_set_header Connection "";
        proxy_buffering off;
        proxy_cache off;
        chunked_transfer_encoding off;
        proxy_read_timeout 3600s;
    }

    # Orthanc
    location /orthanc/ {
        proxy_pass http://backend:8042/;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header Authorization "Basic ${ORTHANC_AUTH_BASE64}";
        proxy_set_header X-Forwarded-Host $host;
    }

    # DICOMweb
    location /dicom-web/ {
        proxy_pass http://backend:8042/dicom-web/;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header Authorization "Basic ${ORTHANC_AUTH_BASE64}";
    }

    # WADO-URI
    location /wado {
        proxy_pass http://backend:8042/wado;
        proxy_set_header Host $host;
        proxy_set_header Authorization "Basic ${ORTHANC_AUTH_BASE64}";
    }
}
```

---

## Step 4: Deploy

```bash
# Stop existing containers
docker compose down

# Create network if not exists
docker network create pacs

# Rebuild (optional - hanya jika ada perubahan kode)
docker compose build --no-cache

# Start all services
docker compose up -d
```

---

## Step 5: Verify

```bash
# Check all containers running
docker ps

# Test akses
curl -L https://your-domain.com          # Frontend
curl -L https://your-domain.com/orthanc/ # Orthanc Explorer
curl -L https://your-domain.com/ohif/    # OHIF Viewer
```

---

## Container Names Reference

| Service Name | Container Name | Port | Description |
|--------------|---------------|------|-------------|
| quantum-web  | quantum-web   | 3001 | Frontend Next.js |
| backend      | backend       | 8042 | Orthanc DICOM Server |
| viewer       | viewer        | 3000 | OHIF Viewer |
| app-db       | app-db        | 5432 | PostgreSQL (App) |
| backend-db   | backend-db    | 5433 | PostgreSQL (Orthanc) |
| ai-engine    | ai-engine     | 8000 | AI Engine |
| nginx        | pacs-gateway  | 80, 443 | Nginx Gateway |

---

## URL Structure

| Path | Service | Description |
|------|---------|-------------|
| `/` | quantum-web | Frontend |
| `/worklist?viewer=UID` | quantum-web → OHIF | Viewer via Frontend |
| `/ohif/` | viewer | OHIF Viewer (standalone) |
| `/ohif/viewer?StudyInstanceUIDs=UID` | viewer | OHIF Viewer direct |
| `/orthanc/` | backend | Orthanc Explorer |
| `/dicom-web/` | backend | DICOMweb API |
| `/wado` | backend | WADO-URI API |

---

## Viewer Links (Telegram)

Link viewer yang dikirim via Telegram:
```
https://your-domain.com/worklist?viewer={StudyInstanceUID}
```

Link ini akan:
1. Buka halaman Worklist di Frontend
2. Otomatis redirect ke OHIF Viewer dengan study yang dipilih

---

## Troubleshooting

### Check Logs
```bash
docker logs pacs-gateway    # Nginx
docker logs quantum-web     # Frontend
docker logs backend        # Orthanc (DICOM)
docker logs backend-db     # PostgreSQL (Orthanc)
docker logs app-db        # PostgreSQL (App)
docker logs ai-engine     # AI Engine
```

### Common Issues

1. **Port 80/443 already in use**
   ```bash
   sudo lsof -i :80
   sudo kill <PID>
   ```

2. **SSL certificate not found**
   ```bash
   # Verify certificates exist
   ls -la /etc/letsencrypt/live/your-domain.com/
   ```

3. **Database connection failed**
   - Check `backend-db` container is healthy
   - Verify credentials in `.env`

4. **Container can't connect to each other**
   - Verify network: `docker network inspect pacs`
   - Recreate network: `docker network rm pacs && docker network create pacs`

5. **Orthanc won't start**
   - Check `orthanc.json` uses `backend-db` (not `orthanc-db`)
   - Check PostgreSQL credentials match between `orthanc.json` and `.env`

6. **OHIF Viewer shows 404**
   - Refresh dengan hard refresh (Ctrl+Shift+R)
   - Clear browser cache
