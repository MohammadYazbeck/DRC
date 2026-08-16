# DRC Group Deployment

Production target:
- Ubuntu 24.04 LTS VPS
- Docker Compose
- Traefik reverse proxy
- Domain: `drcgroup.co`

## What Must Persist

The app has two runtime-write locations:
- `/app/data`: CMS JSON, career applications, and private application resume files.
- `/app/public/uploads`: uploaded CMS images/files that must be publicly served.

The Docker setup mounts both as Docker volumes:
- `drc_data:/app/data`
- `drc_uploads:/app/public/uploads`

The image contains the current `data/cms-content.json` and any committed `public/uploads` files as the initial seed. The entrypoint copies them only when the volumes are empty, so future deployments do not overwrite live CMS data or uploaded files.

## Required Before Deploy

1. Point DNS to the VPS:
   - `A drcgroup.co -> VPS IPv4`
   - `A www.drcgroup.co -> VPS IPv4`
   - Add `AAAA` records only if IPv6 is configured and tested.

2. Create the production env file on the server:

```bash
cp .env.production.example .env.production
nano .env.production
```

Use a long random value:

```bash
ADMIN_PASSWORD=replace-with-a-long-random-password
```

In production, the admin API is locked if `ADMIN_PASSWORD` is missing.

3. Create the shared Traefik network:

```bash
docker network create traefik
```

## Server Bootstrap

Use Docker's official apt repository for Ubuntu 24.04. After Docker is installed, verify:

```bash
docker --version
docker compose version
docker run --rm hello-world
```

Recommended firewall:

```bash
ufw allow OpenSSH
ufw allow 80/tcp
ufw allow 443/tcp
ufw enable
```

## Start Traefik

From the repo:

```bash
cd ops/traefik
cp env.example .env
nano .env
docker compose up -d
```

The Traefik stack listens on ports `80` and `443`, watches Docker labels, and stores Let's Encrypt ACME state in the `traefik_letsencrypt` volume.

## Deploy The App

Clone/pull the repo on the server, then:

```bash
cp .env.production.example .env.production
nano .env.production
docker compose -p drc up -d --build
```

Check status:

```bash
docker compose -p drc ps
docker compose -p drc logs -f drc-web
curl -I https://drcgroup.co
```

## Updating Without Losing Data

For normal updates:

```bash
git pull
docker compose -p drc up -d --build
```

Do not delete these volumes unless you intentionally want to reset production content:
- `drc_drc_data`
- `drc_drc_uploads`

Before major updates, back them up:

```bash
mkdir -p backups
docker run --rm -v drc_drc_data:/data -v "$PWD/backups:/backup" alpine tar czf /backup/drc-data-$(date +%F-%H%M).tgz -C /data .
docker run --rm -v drc_drc_uploads:/uploads -v "$PWD/backups:/backup" alpine tar czf /backup/drc-uploads-$(date +%F-%H%M).tgz -C /uploads .
```

## Uploads And Image Serving

Uploads are saved by the app to:
- CMS files/images: `/uploads/cms/...`, stored in `/app/public/uploads/cms`.
- Career application resumes: `/api/applications/resume/...`, stored privately under `/app/data/uploads/applications`.

CMS image paths map to `public/uploads` and are served by Next.js. `next.config.mjs` allows `/uploads/**` through the image optimizer. Resume downloads require the admin password header and are not directly public static files.

## Missing Or Recommended Next Steps

- Email delivery for career applications/contact notifications. Right now applications are stored in JSON and visible in admin.
- Regular off-server backups for `drc_data` and `drc_uploads`.
- A stronger admin access layer, such as Traefik basic auth or IP allowlist for `/admin`.
- Monitoring and log rotation.
- A tested restore procedure from backups.
- Optional: move CMS/applications from JSON files to PostgreSQL when concurrent admin usage grows.

## Useful References

- Docker Engine on Ubuntu: https://docs.docker.com/engine/install/ubuntu/
- Traefik Docker provider: https://doc.traefik.io/traefik/providers/docker/
- Traefik Docker/Let's Encrypt setup: https://doc.traefik.io/traefik/setup/docker/
