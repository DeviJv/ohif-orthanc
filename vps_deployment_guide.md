# VPS Deployment Guide (Ubuntu 24.04)

Follow these steps to deploy Quantum PACS to your Ubuntu 24.04 VPS.

---

## 1. Prerequisites (on VPS)

Run these commands on your fresh Ubuntu VPS to install Docker and Git:

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Docker & Docker Compose
sudo apt install -y docker.io docker-compose-v2 git certbot

# Ensure user can run docker (optional)
sudo usermod -aG docker $USER
```

---

## 2. Point Your Domain

Ensure your domain (e.g., `pacs.yourdomain.com`) A-Record points to your VPS IP address.

---

## 3. Clone and Configure

```bash
# Clone repo
git clone <your-repo-url>
cd ohif-orthanc

# Create .env
cp .env.example .env # or edit your existing .env
```

**Edit `.env` and set these critical production values:**
- `DOMAIN_NAME`: `pacs.yourdomain.com`
- `NEXT_PUBLIC_APP_URL`: `https://pacs.yourdomain.com`
- `PROTOCOL`: `https`
- `SATU_SEHAT`: `sandbox` (or `production`)

---

## 4. Get SSL Certificates (Let's Encrypt)

Before starting the containers, you need to generate the SSL certificates. Use Certbot in standalone mode:

```bash
sudo certbot certonly --standalone -d yourdomain.com
```

> [!IMPORTANT]
> Change the paths in `nginx_prod.conf` to match your domain. If your domain is `example.com`, the paths should be `/etc/nginx/ssl/live/example.com/...`.

---

## 5. Launch in Production

Run the project using both the main compose and the production override:

```bash
docker compose -f docker-compose.yml -f docker-compose.prod.yml up -d --build
```

---

## 6. Maintenance

- **View Logs**: `docker compose logs -f`
- **Rebuild Frontend**: `docker compose up -d --build frontend`
- **Restart Nginx**: `docker compose restart nginx`

---

## 7. Troubleshooting

If the viewer is black:
1. Check that `nginx_prod.conf` has the correct `localhost` vs `domain` logic.
2. Ensure `PROTOCOL=https` is set in `.env`.
3. Verify that ports 80 and 443 are open in your VPS firewall (UFW or Security Group).
