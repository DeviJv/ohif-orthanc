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

# App URL - GANTI KE HTTPS + Domain
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

---

## Step 2: Setup SSL Certificates

### Option A: Manual Letsencrypt

```bash
# Install certbot
sudo apt install certbot

# Generate SSL certificates
sudo certbot certonly --standalone -d your-domain.com

# Copy to letsencrypt folder (buat symlink)
sudo mkdir -p /etc/letsencrypt/live/your-domain.com
sudo ln -s /etc/letsencrypt/live/your-domain.com/fullchain.pem /etc/letsencrypt/live/your-domain.com/fullchain.pem
sudo ln -s /etc/letsencrypt/live/your-domain.com/privkey.pem /etc/letsencrypt/live/your-domain.com/privkey.pem
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

Edit `nginx.conf` - Pastikan ada HTTPS server block:

```nginx
server {
    listen 443 ssl http2;
    server_name _;

    ssl_certificate     /etc/nginx/ssl/live/${DOMAIN_NAME}/fullchain.pem;
    ssl_certificate_key /etc/nginx/ssl/live/${DOMAIN_NAME}/privkey.pem;
    ssl_protocols       TLSv1.2 TLSv1.3;
    ssl_ciphers         HIGH:!aNULL:!MD5;

    # ... rest of config ...
}
```

---

## Step 4: Deploy

```bash
# Stop existing containers
docker compose down

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

| Service Name | Container Name | Port |
|--------------|---------------|------|
| quantum-web  | quantum-web   | 3001 |
| backend      | backend       | 8042 |
| viewer       | viewer        | 3000 |
| app-db       | app-db        | 5432 |
| backend-db   | backend-db    | 5433 |
| ai-engine    | ai-engine     | 8000 |
| nginx        | pacs-gateway  | 80, 443 |

---

## URL Structure

| Path | Service |
|------|---------|
| `/` | quantum-web (Frontend) |
| `/ohif/` | viewer (OHIF Viewer) |
| `/orthanc/` | backend (Orthanc Explorer) |
| `/dicom-web/` | backend (DICOMweb) |
| `/wado` | backend (WADO-URI) |

---

## Troubleshooting

### Check Logs
```bash
docker logs pacs-gateway    # Nginx
docker logs quantum-web     # Frontend
docker logs backend        # Orthanc
docker logs ai-engine      # AI Engine
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
