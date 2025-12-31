#!/usr/bin/env python
import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend_django.settings')
django.setup()

from api.models import User

# Check if admin exists
try:
    admin = User.objects.get(email='admin@example.com')
    print("✓ Admin user already exists")
except User.DoesNotExist:
    # Create admin
    admin = User.objects.create_superuser('admin@example.com', 'admin123', name='Administrator', role='admin')
    print("✓ Admin user created")

print("\n=== Django Admin Credentials ===")
print(f"Email: admin@example.com")
print(f"Password: admin123")
print(f"Role: admin")
print(f"URL: http://localhost:8000/admin/")
print("\nDjango uses email as the login field, not username.")
