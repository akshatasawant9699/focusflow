# FocusFlow Self-Hosting Guide

**Last Updated:** July 2, 2026

This guide covers deploying FocusFlow on your own infrastructure. Self-hosting gives you complete data ownership, zero telemetry, and full control over your productivity data.

---

## Why Self-Host?

**Privacy:** Your task data, brain dumps, and focus sessions never leave your server  
**Control:** No dependency on hosted service availability  
**Customization:** Modify the codebase for your specific needs  
**Cost:** Free (except server costs, typically $5-10/month)

---

## Prerequisites

- **Docker** 20.10+ and **Docker Compose** 2.0+
- **Server** with 1GB RAM minimum (2GB recommended)
- **Domain name** (optional, for HTTPS)

---

## Quick Start (SQLite)

The fastest way to self-host FocusFlow uses SQLite (no external database required).

```bash
# Clone repository
git clone https://github.com/akshatasawant9699/focusflow.git
cd focusflow

# Copy environment file
cp .env.example .env

# Edit .env (generate AUTH_SECRET)
openssl rand -base64 32  # Copy this to AUTH_SECRET in .env

# Start services
docker compose up -d

# Check status
docker compose ps
```

Access FocusFlow at **http://localhost:3000**

---

## Production Deployment Options

### Option 1: Docker Compose (Recommended)

Best for: VPS servers (DigitalOcean, Linode, Hetzner)

**1. Prepare your server:**

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Docker
curl -fsSL https://get.docker.com | sh

# Install Docker Compose
sudo apt install docker-compose-plugin

# Create app directory
mkdir -p /opt/focusflow
cd /opt/focusflow
```

**2. Clone and configure:**

```bash
git clone https://github.com/akshatasawant9699/focusflow.git .

# Create .env file
cp .env.example .env

# Edit environment variables
nano .env
```

**3. Configure `.env`:**

```bash
# Database (SQLite for simple deployments)
DATABASE_URL="file:/app/data/focusflow.db"

# Auth
AUTH_SECRET="your-secure-random-string-32-chars"

# Optional: Enable Postgres (see Option 2 below)
# DATABASE_URL="postgresql://postgres:password@postgres:5432/focusflow"

# Optional: V1.1+ integrations
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""
```

**4. Start services:**

```bash
docker compose up -d

# View logs
docker compose logs -f app

# Check status
docker compose ps
```

---

### Option 2: Docker Compose with Postgres

Best for: Multi-user deployments, better performance

**1. Update `docker-compose.yml`:**

```yaml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=postgresql://postgres:${POSTGRES_PASSWORD}@postgres:5432/focusflow
      - AUTH_SECRET=${AUTH_SECRET}
    depends_on:
      postgres:
        condition: service_healthy
    volumes:
      - ./data:/app/data
    restart: unless-stopped

  postgres:
    image: postgres:15-alpine
    environment:
      POSTGRES_DB: focusflow
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD}
    volumes:
      - postgres_data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres"]
      interval: 10s
      timeout: 5s
      retries: 5
    restart: unless-stopped

volumes:
  postgres_data:
```

**2. Update `.env`:**

```bash
DATABASE_URL="postgresql://postgres:your-postgres-password@postgres:5432/focusflow"
POSTGRES_PASSWORD="your-postgres-password"
AUTH_SECRET="your-secure-random-string"
```

**3. Start services:**

```bash
docker compose up -d

# Run migrations
docker compose exec app pnpm db:migrate
```

---

### Option 3: HTTPS with Caddy

Best for: Production deployments with custom domain

**1. Update `docker-compose.yml` to include Caddy:**

```yaml
version: '3.8'

services:
  app:
    build: .
    expose:
      - "3000"
    environment:
      - DATABASE_URL=file:/app/data/focusflow.db
      - AUTH_SECRET=${AUTH_SECRET}
    volumes:
      - ./data:/app/data
    restart: unless-stopped

  caddy:
    image: caddy:2-alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./Caddyfile:/etc/caddy/Caddyfile
      - caddy_data:/data
      - caddy_config:/config
    restart: unless-stopped

volumes:
  caddy_data:
  caddy_config:
```

**2. Create `Caddyfile`:**

```
focusflow.yourdomain.com {
    reverse_proxy app:3000
    encode gzip

    # Optional: Basic auth for private deployment
    # basicauth /* {
    #     youruser your-bcrypt-hashed-password
    # }
}
```

**3. Point your domain to server IP:**

```bash
# Add A record in DNS:
# focusflow.yourdomain.com -> your-server-ip
```

**4. Start services:**

```bash
docker compose up -d
```

Caddy automatically provisions Let's Encrypt SSL certificate.

Access FocusFlow at **https://focusflow.yourdomain.com**

---

## Updating FocusFlow

```bash
cd /opt/focusflow

# Pull latest changes
git pull origin main

# Rebuild and restart
docker compose down
docker compose up -d --build

# Run migrations (if needed)
docker compose exec app pnpm db:migrate
```

---

## Backup & Restore

### SQLite Backup

```bash
# Backup database
docker compose exec app cp /app/data/focusflow.db /app/data/backup-$(date +%Y%m%d).db

# Copy backup to host
docker compose cp app:/app/data/backup-*.db ./backups/

# Restore from backup
docker compose cp ./backups/backup-20260702.db app:/app/data/focusflow.db
docker compose restart app
```

### Postgres Backup

```bash
# Backup database
docker compose exec postgres pg_dump -U postgres focusflow > backup-$(date +%Y%m%d).sql

# Restore from backup
docker compose exec -T postgres psql -U postgres focusflow < backup-20260702.sql
```

### Automated Backups

Add to crontab (`crontab -e`):

```bash
# Daily backup at 2 AM
0 2 * * * cd /opt/focusflow && docker compose exec app cp /app/data/focusflow.db /app/data/backup-$(date +\%Y\%m\%d).db

# Weekly cleanup (keep last 30 backups)
0 3 * * 0 cd /opt/focusflow/data && ls -t backup-*.db | tail -n +31 | xargs rm -f
```

---

## Monitoring

### Health Check

```bash
# Check if app is running
curl http://localhost:3000/api/health

# Expected response:
# {"status":"ok","database":"connected"}
```

### View Logs

```bash
# Follow logs
docker compose logs -f

# View last 100 lines
docker compose logs --tail=100

# View specific service logs
docker compose logs app
docker compose logs postgres
```

### Resource Usage

```bash
# Check container stats
docker stats

# Check disk usage
docker system df
```

---

## Security Hardening

### 1. Firewall Configuration

```bash
# Allow SSH, HTTP, HTTPS
sudo ufw allow 22
sudo ufw allow 80
sudo ufw allow 443
sudo ufw enable
```

### 2. Automatic Security Updates

```bash
# Install unattended-upgrades
sudo apt install unattended-upgrades

# Enable automatic updates
sudo dpkg-reconfigure -plow unattended-upgrades
```

### 3. Restrict Docker to localhost (if not using Caddy)

Update `docker-compose.yml`:

```yaml
services:
  app:
    ports:
      - "127.0.0.1:3000:3000"  # Only accessible via localhost
```

Then use nginx/Caddy as reverse proxy.

### 4. Environment Variable Protection

```bash
# Set strict permissions on .env
chmod 600 .env

# Never commit .env to git
echo ".env" >> .gitignore
```

---

## Troubleshooting

### Container won't start

```bash
# Check logs
docker compose logs app

# Common issues:
# - Port 3000 already in use: Change port in docker-compose.yml
# - Permission issues: Check data volume permissions
# - Database connection failed: Verify DATABASE_URL in .env
```

### Database migration errors

```bash
# Reset database (WARNING: deletes all data)
docker compose down -v
docker compose up -d

# Or manually run migrations
docker compose exec app pnpm db:migrate
```

### Can't access from external IP

```bash
# Check if port is open
sudo netstat -tuln | grep 3000

# Check firewall
sudo ufw status

# If using cloud provider, check security groups
```

### High memory usage

```bash
# Limit Docker container memory
# Add to docker-compose.yml under app service:
    deploy:
      resources:
        limits:
          memory: 512M
```

---

## Platform-Specific Guides

### DigitalOcean Droplet

1. Create Droplet (Ubuntu 22.04, $6/month tier)
2. SSH into droplet: `ssh root@your-droplet-ip`
3. Follow "Production Deployment Options" above
4. Point domain A record to droplet IP

### Hetzner Cloud

1. Create CX11 server (2GB RAM, €4.15/month)
2. SSH into server: `ssh root@your-server-ip`
3. Follow "Production Deployment Options" above
4. Use Hetzner Cloud Firewall for security

### Raspberry Pi

**Requirements:** Raspberry Pi 4 with 2GB+ RAM

```bash
# Install Docker on Raspberry Pi OS
curl -fsSL https://get.docker.com | sh

# Add your user to docker group
sudo usermod -aG docker $USER

# Reboot
sudo reboot

# Follow "Quick Start (SQLite)" above
```

---

## Environment Variables Reference

### Required

```bash
AUTH_SECRET="your-random-32-char-secret"  # openssl rand -base64 32
DATABASE_URL="file:/app/data/focusflow.db"  # or postgres://...
```

### Optional (V1.1+)

```bash
# Google Calendar Integration
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# Microsoft Calendar Integration
MICROSOFT_CLIENT_ID="your-microsoft-client-id"
MICROSOFT_CLIENT_SECRET="your-microsoft-client-secret"

# Salesforce Integration
SALESFORCE_CLIENT_ID="your-salesforce-client-id"
SALESFORCE_CLIENT_SECRET="your-salesforce-client-secret"

# Telemetry (opt-in)
ENABLE_TELEMETRY="false"  # Default: false
```

---

## Cost Estimates

### Minimal Setup (SQLite)

- **Hetzner CX11:** €4.15/month (~$4.50)
- **DigitalOcean Basic Droplet:** $6/month
- **Oracle Cloud Free Tier:** $0 (1 free VPS forever)

### Production Setup (Postgres + Caddy)

- **DigitalOcean Droplet (2GB):** $12/month
- **Hetzner CPX11:** €5.83/month (~$6.50)
- **Domain:** $12/year (~$1/month)

**Total:** ~$7-13/month for unlimited users

---

## Migration from Hosted Tier

If you're migrating from focusflow.app to self-hosted:

1. **Export data** from hosted tier (Settings → Export Data → JSON)
2. **Set up self-hosted instance** (follow guides above)
3. **Import data** via API or Drizzle Studio
4. **Verify** all plans, sessions, and brain dumps imported correctly

Detailed migration guide: [docs/migration.md](./migration.md) (V1.1+)

---

## Support

**GitHub Issues:** [Report deployment issues](https://github.com/akshatasawant9699/focusflow/issues)  
**GitHub Discussions:** [Self-hosting help](https://github.com/akshatasawant9699/focusflow/discussions)

---

**Maintained by:** [@akshatasawant9699](https://github.com/akshatasawant9699)

Last updated: July 2, 2026