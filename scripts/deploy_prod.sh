#!/bin/sh
# Simple deploy script for a Linux server (run on the server)
# Assumes payload is uploaded to /tmp/deploy_payload.tar.gz
set -e
mkdir -p /opt/hostel
tar -xzf /tmp/deploy_payload.tar.gz -C /opt/hostel
cd /opt/hostel/backend_django
python -m pip install -r requirements.txt
python manage.py migrate --noinput
python manage.py collectstatic --noinput
systemctl daemon-reload || true
systemctl restart backend.service || systemctl start backend.service
cd /opt/hostel/frontend_next
npm ci --production
# Use pm2 or systemd to run Node; here we rely on systemd unit
systemctl restart frontend.service || systemctl start frontend.service
echo "Deployed successfully"
