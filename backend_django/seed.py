#!/usr/bin/env python
import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend_django.settings')
django.setup()

from api.models import Hostel, City, User

# Update existing hostels with proper monthly rent in PKR
hostels = Hostel.objects.all()
for h in hostels:
    if h.monthly_rent == 0:
        h.monthly_rent = 15000  # Default monthly rent
        h.save()
        print(f"Updated {h.name} with PKR {h.monthly_rent}/month")

# Create sample hostels if none exist
if hostels.count() == 0:
    # Create cities if needed
    karachi, _ = City.objects.get_or_create(name='Karachi')
    lahore, _ = City.objects.get_or_create(name='Lahore')
    islamabad, _ = City.objects.get_or_create(name='Islamabad')
    peshawar, _ = City.objects.get_or_create(name='Peshawar')
    
    # Create owner if needed
    owner = User.objects.filter(role='owner').first()
    if not owner:
        owner = User.objects.create_user(email='owner@example.com', password='password', name='Hostel Owner', role='owner')
    
    hostels_data = [
        {'name': 'City Center Hostel', 'city': karachi, 'monthly_rent': 12000, 'features': ['WiFi', 'Kitchen', 'Common Area'], 'description': 'Cozy hostel in the heart of Karachi with modern facilities'},
        {'name': 'Beachfront Beds', 'city': karachi, 'monthly_rent': 18000, 'features': ['WiFi', 'Beach Access', 'Laundry'], 'description': 'Beautiful beachfront hostel with stunning sea views'},
        {'name': 'Lahore Haven', 'city': lahore, 'monthly_rent': 10000, 'features': ['WiFi', 'AC', 'Private Room'], 'description': 'Budget-friendly hostel in the cultural heart of Lahore'},
        {'name': 'Islamabad Hub', 'city': islamabad, 'monthly_rent': 14000, 'features': ['WiFi', 'Parking', 'Kitchen'], 'description': 'Modern hostel near Islamabad city center with parking'},
        {'name': 'Peshawar Travelers', 'city': peshawar, 'monthly_rent': 8000, 'features': ['WiFi', 'Common Area', 'Laundry'], 'description': 'Affordable hostel welcoming travelers from around the world'},
    ]
    
    for h in hostels_data:
        hostel = Hostel.objects.create(
            name=h['name'],
            city=h['city'],
            monthly_rent=h['monthly_rent'],
            features=h['features'],
            owner=owner,
            rooms=3,
            available_seats=5,
            rating=4.5,
            description=h['description'],
            images=['https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=500&q=80']
        )
        print(f"Created {hostel.name} with PKR {hostel.monthly_rent}/month")

print("Database seeded successfully!")
