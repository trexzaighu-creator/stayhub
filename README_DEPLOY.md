Quick deploy checklist

1) Prepare server (Ubuntu example):

- Create `www-data` user if not existing, or choose your deploy user.
- Install system packages: `nginx`, `python3-venv`, `nodejs` (or Node via NodeSource), `npm`, `git`, `certbot`.

2) Copy unit files and Nginx config (from `deploy/`):

- Copy `deploy/backend.service` to `/etc/systemd/system/backend.service`
- Copy `deploy/frontend.service` to `/etc/systemd/system/frontend.service`
- Copy `deploy/nginx_hostel.conf` to `/etc/nginx/sites-available/hostel` and symlink to `sites-enabled`

3) Create `/opt/hostel` and upload payload (CI handles this via SSH)

4) Obtain SSL cert (Let's Encrypt):

```bash
sudo apt-get install certbot python3-certbot-nginx
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

5) Start services:

```bash
sudo systemctl daemon-reload
sudo systemctl enable backend.service frontend.service
sudo systemctl start backend.service frontend.service
sudo systemctl restart nginx
```

6) CI: Add repository secrets in GitHub:
- `DEPLOY_HOST` (server IP)
- `DEPLOY_USER` (ssh user)
- `DEPLOY_SSH_KEY` (private key)
- `DEPLOY_PATH` (optional, default /tmp)
- `DEPLOY_PORT` (optional)

7) Push to `main` to trigger `.github/workflows/deploy.yml`.

Notes
- Review and adapt paths (`/opt/hostel`) and user/group in unit files.
- Ensure `.env` on server contains production environment variables (do not commit secrets).
- Consider using Docker/containers instead of systemd for portability.
