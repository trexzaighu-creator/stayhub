# Production Deployment Guide

## ✅ Build Status
- **Frontend (Next.js)**: ✅ Production build successful
- **Backend (Django)**: ✅ Ready for production

---

## 📋 Pre-Deployment Checklist

### Frontend (Next.js)
- [x] Removed all console.log debug statements
- [x] Fixed TypeScript errors
- [x] Production build passes without errors
- [x] Static assets optimized
- [x] Environment variables configured

### Backend (Django)
- [ ] Update `DJANGO_SECRET_KEY` in `.env.production` (CRITICAL)
- [ ] Update `ALLOWED_HOSTS` with your domain
- [ ] Configure database (PostgreSQL recommended for production)
- [ ] Set `DEBUG=0` for production
- [ ] Configure CORS origins
- [ ] Set up proper logging

---

## 🚀 Deployment Steps

### 1. Frontend Deployment (Next.js)

#### Local Setup
```bash
cd frontend_next
npm install
npm run build
npm start
```

#### Environment Configuration
Copy `.env.production` and update with your production values:
```env
NEXT_PUBLIC_API_URL=https://api.yourdomain.com
```

#### Deploy to Vercel (Recommended)
```bash
npm install -g vercel
vercel --prod
```

#### Deploy to Other Platforms
- **Docker**: Use the provided Dockerfile
- **Linux/VPS**: Use `pm2` to run `npm start`
- **Cloud Platforms**: AWS, Google Cloud, Azure all support Next.js

### 2. Backend Deployment (Django)

#### Environment Setup
```bash
cd backend_django

# Copy and edit production environment file
cp .env.production .env

# Update critical values:
# DJANGO_SECRET_KEY=<generate-new-secret-key>
# ALLOWED_HOSTS=yourdomain.com
# DATABASE_URL=postgresql://...
```

#### Generate Django Secret Key
```bash
python -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"
```

#### Database Setup (PostgreSQL)
```bash
# Install PostgreSQL packages
pip install psycopg2-binary

# Run migrations
python manage.py migrate

# Create superuser
python manage.py createsuperuser

# Collect static files
python manage.py collectstatic --noinput
```

#### Running on Production
Using Gunicorn + Nginx:
```bash
# Install Gunicorn
pip install gunicorn

# Run with Gunicorn
gunicorn -w 4 -b 127.0.0.1:8000 backend_django.wsgi:application
```

#### Using Docker
```bash
docker build -t hostel-api .
docker run -p 8000:8000 -e DJANGO_SECRET_KEY=... hostel-api
```

#### Using PM2
```bash
pip install django-environ gunicorn

# Create ecosystem.config.js
cat > ecosystem.config.js << EOF
module.exports = {
  apps: [{
    name: 'hostel-api',
    script: 'gunicorn',
    args: '-w 4 -b 127.0.0.1:8000 backend_django.wsgi:application',
    cwd: './backend_django',
  }]
};
EOF

# Start with PM2
pm2 start ecosystem.config.js
```

### 3. Nginx Configuration

```nginx
upstream django {
    server 127.0.0.1:8000;
}

upstream nextjs {
    server 127.0.0.1:3000;
}

server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;
    
    # Redirect HTTP to HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name yourdomain.com www.yourdomain.com;
    
    # SSL certificates (use Let's Encrypt)
    ssl_certificate /etc/letsencrypt/live/yourdomain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/yourdomain.com/privkey.pem;
    
    # API routes
    location /api/ {
        proxy_pass http://django;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
    
    # Static files from Django
    location /static/ {
        alias /path/to/backend_django/staticfiles/;
    }
    
    # Uploads
    location /uploads/ {
        alias /path/to/backend_django/uploads/;
    }
    
    # Frontend routes
    location / {
        proxy_pass http://nextjs;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

### 4. SSL Certificate (Let's Encrypt)

```bash
sudo apt-get install certbot python3-certbot-nginx
sudo certbot certonly --nginx -d yourdomain.com -d www.yourdomain.com
```

### 5. Database Backup

```bash
# PostgreSQL backup
pg_dump hostel_db > backup.sql

# Restore
psql hostel_db < backup.sql
```

---

## 🔒 Security Checklist

- [ ] Django `DEBUG = False`
- [ ] Unique `DJANGO_SECRET_KEY` generated
- [ ] HTTPS/SSL configured
- [ ] CORS restricted to your domain
- [ ] Database credentials secured
- [ ] API keys and tokens not committed to git
- [ ] Regular database backups enabled
- [ ] Firewall rules configured
- [ ] Rate limiting enabled
- [ ] Input validation on all endpoints

---

## 📊 Monitoring & Logging

### Django Logs
```bash
# View logs
tail -f /var/log/hostel-api/error.log

# Using PM2
pm2 logs hostel-api
```

### Metrics to Monitor
- API response time
- Error rates
- Database performance
- Disk space
- Memory usage
- Request volume

---

## 🔄 Updating Production

### Frontend Updates
```bash
cd frontend_next
git pull origin main
npm install
npm run build
npm start
```

### Backend Updates
```bash
cd backend_django
git pull origin main
pip install -r requirements.txt
python manage.py migrate
python manage.py collectstatic --noinput
pm2 restart hostel-api
```

---

## 📝 Important Reminders

1. **Keep Backups**: Regular database and code backups
2. **Monitor Logs**: Check error logs regularly
3. **Update Dependencies**: Keep packages up to date
4. **Test Locally First**: Always test changes locally before deploying
5. **Use Version Control**: Track all configuration changes
6. **Documentation**: Keep deployment documentation updated

---

## 🆘 Troubleshooting

### 502 Bad Gateway
- Check if backend is running
- Verify Nginx upstream configuration
- Check Django logs

### CORS Errors
- Verify `ALLOWED_HOSTS` in Django
- Check `CORS_ALLOWED_ORIGINS` setting
- Ensure frontend URL is in allowed origins

### Static Files Not Loading
- Run `python manage.py collectstatic`
- Check Nginx static file location
- Verify file permissions

### Database Errors
- Check database connection string
- Verify database is running
- Run migrations: `python manage.py migrate`

---

**Last Updated**: December 31, 2025
**Status**: Production Ready ✅
