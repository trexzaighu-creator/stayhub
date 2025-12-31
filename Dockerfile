FROM node:18-alpine AS frontend_builder

WORKDIR /app/frontend

COPY frontend_next/package*.json ./

RUN npm ci

COPY frontend_next/ .

RUN npm run build

# Backend stage
FROM python:3.11-slim

WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    postgresql-client \
    && rm -rf /var/lib/apt/lists/*

# Copy backend requirements
COPY backend_django/requirements.txt ./

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt gunicorn

# Copy backend code
COPY backend_django/ ./

# Copy frontend build from builder stage
COPY --from=frontend_builder /app/frontend/.next ./frontend/.next
COPY --from=frontend_builder /app/frontend/public ./frontend/public
COPY --from=frontend_builder /app/frontend/package.json ./frontend/

# Collect static files
RUN python manage.py collectstatic --noinput || true

# Environment variables
ENV PYTHONUNBUFFERED=1
ENV DEBUG=0

# Expose ports
EXPOSE 8000 3000

# Create startup script
RUN echo '#!/bin/sh\nset -e\npython manage.py migrate\npython manage.py collectstatic --noinput\ngunicorn -w 4 -b 0.0.0.0:8000 backend_django.wsgi:application' > /start.sh && chmod +x /start.sh

CMD ["/start.sh"]
