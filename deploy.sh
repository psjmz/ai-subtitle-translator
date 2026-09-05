#!/bin/bash
# SRT Subtitle Translator · One-click deployment for Ubuntu (root)
# Usage (run inside the cloned repo directory):
#   bash deploy.sh                 # HTTP mode  (listens on port 80)
#   bash deploy.sh --https DOMAIN  # HTTPS mode (Caddy auto-issues a free cert, ports 80+443)
# Notes: safe to re-run (in-place upgrade); existing data/ runtime config
#        (admin password / model key) is preserved.
set -e

APP_DIR=/opt/srt-translator
REPO_DIR="$(cd "$(dirname "$0")" && pwd)"
HTTPS_DOMAIN=""

if [ "$1" = "--https" ] && [ -n "$2" ]; then
  HTTPS_DOMAIN="$2"
fi

echo "==> [1/5] Installing Node.js 20 LTS"
if ! command -v node >/dev/null 2>&1 || [ "$(node -v 2>/dev/null | cut -c2- | cut -d. -f1)" -lt 18 ]; then
  curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
  apt-get install -y nodejs
fi
echo "    Node version: $(node -v)"

echo "==> [2/5] Deploying files to $APP_DIR"
mkdir -p "$APP_DIR" "$APP_DIR/data"
# Copy from the repo directory (data/ excluded so existing runtime config is kept)
tar -C "$REPO_DIR" --exclude='data' --exclude='.git' -cf - . | tar -xf - -C "$APP_DIR"

if [ -n "$HTTPS_DOMAIN" ]; then
  APP_PORT=3000
  echo "==> [3/5] HTTPS mode: installing Caddy (domain $HTTPS_DOMAIN)"
  if ! command -v caddy >/dev/null 2>&1; then
    # gnupg: missing on minimal images, needed for the cloudsmith repo
    apt-get update || true
    apt-get install -y debian-keyring debian-archive-keyring apt-transport-https curl gnupg || true
    # Prefer the official Ubuntu repo (universe ships caddy); fall back to the official Caddy repo
    if ! apt-get install -y caddy; then
      echo "    caddy not in Ubuntu repos, using the official cloudsmith repo..."
      curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/gpg.key' | gpg --batch --yes --dearmor -o /usr/share/keyrings/caddy-stable-archive-keyring.gpg
      curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/debian.deb.txt' | tee /etc/apt/sources.list.d/caddy-stable.list
      apt-get update && apt-get install -y caddy
    fi
  fi
  echo "    Caddy version: $(caddy version 2>/dev/null || echo unknown)"
  cat > /etc/caddy/Caddyfile <<EOF
$HTTPS_DOMAIN {
  encode gzip
  reverse_proxy 127.0.0.1:$APP_PORT
}
EOF
  echo "    Caddyfile written (not started yet - app must move to port $APP_PORT first to avoid a port-80 clash)"
else
  APP_PORT=80
  echo "==> [3/5] HTTP mode (for HTTPS re-run: bash deploy.sh --https YOUR_DOMAIN)"
fi

echo "==> [4/5] Registering systemd service (PORT=$APP_PORT)"
cat > /etc/systemd/system/srt-translator.service <<EOF
[Unit]
Description=SRT Translator (subtitle translation workbench)
After=network.target

[Service]
Type=simple
WorkingDirectory=$APP_DIR
ExecStart=$(command -v node) server.js
Environment=PORT=$APP_PORT
Restart=always
RestartSec=3

[Install]
WantedBy=multi-user.target
EOF
systemctl daemon-reload
systemctl enable srt-translator
# Stop old instance first, then free the target port before (re)starting
systemctl stop srt-translator 2>/dev/null || true
if command -v fuser >/dev/null 2>&1; then
  fuser -k "$APP_PORT"/tcp 2>/dev/null || true
  sleep 1
fi
systemctl start srt-translator

if [ -n "$HTTPS_DOMAIN" ]; then
  echo "==> [5/5] Starting Caddy and requesting certificate (may take 1-2 min)..."
  systemctl enable caddy 2>/dev/null || true
  systemctl restart caddy
  sleep 4
fi

echo
echo "=============================================="
echo "  Deployment complete!"
if [ -n "$HTTPS_DOMAIN" ]; then
  echo "  App:  https://$HTTPS_DOMAIN"
  echo "  Admin: https://$HTTPS_DOMAIN/admin.html"
else
  echo "  App:  http://$(curl -s --max-time 3 ifconfig.me 2>/dev/null || echo SERVER_IP)"
  echo "  Admin: http://$(curl -s --max-time 3 ifconfig.me 2>/dev/null || echo SERVER_IP)/admin.html"
fi
echo "  Next: open /admin.html - the FIRST login password"
echo "        you enter becomes the admin password."
echo "=============================================="
