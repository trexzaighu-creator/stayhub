#!/usr/bin/env python
import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend_django.settings')
django.setup()

from api.models import Hostel, City, User

# Create cities if they don't exist
cities_data = [
    {'name': 'Karachi'},
    {'name': 'Lahore'},
    {'name': 'Islamabad'},
    {'name': 'Peshawar'},
]

cities = {}
for city_data in cities_data:
    city, created = City.objects.get_or_create(**city_data)
    cities[city_data['name']] = city
    if created:
        print(f"Created city: {city.name}")

# Create or update owner user if doesn't exist
owner, created = User.objects.get_or_create(
    email='owner@hostel.com',
    defaults={
        'name': 'Hostel Owner',
        'role': 'owner'
    }
)
if created:
    owner.set_password('password123')
    owner.save()
    print(f"Created owner user: {owner.email}")

# Sample hostels data with monthly rent in PKR
hostels_data = [
    {
        'name': 'Budget Traveler Hostel',
        'city': 'Karachi',
        'monthly_rent': 8000,  # PKR per month
        'description': 'Affordable and comfortable hostel with clean rooms and friendly staff.',
        'features': ['WiFi', 'Common Area', 'Hot Water', 'Kitchen'],
        'rooms': 8,
        'available_seats': 24,
        'lat': 24.8607,
        'lng': 67.0011,
        'images': ['https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400&q=80'],
        'rating': 4.5,
        'reviews_count': 12
    },
    {
        'name': 'City Center Hostel',
        'city': 'Lahore',
        'monthly_rent': 10000,  # PKR per month
        'description': 'Located in the heart of Lahore with easy access to all attractions.',
        'features': ['WiFi', 'Kitchen', 'Laundry', 'AC', 'Common Area'],
        'rooms': 10,
        'available_seats': 30,
        'lat': 31.5204,
        'lng': 74.3587,
        'images': ['https://images.unsplash.com/photo-1552883657-23ac6755469f?w=400&q=80'],
        'rating': 4.7,
        'reviews_count': 28
    },
    {
        'name': 'Capital View Hostel',
        'city': 'Islamabad',
        'monthly_rent': 9500,  # PKR per month
        'description': 'Modern hostel with beautiful views of the Margalla Hills.',
        'features': ['WiFi', 'Private Room Option', 'Hot Water', 'Parking', 'Common Area'],
        'rooms': 12,
        'available_seats': 36,
        'lat': 33.6844,
        'lng': 73.0479,
        'images': ['https://images.unsplash.com/photo-1564430551519-78a2be0b9fea?w=400&q=80'],
        'rating': 4.8,
        'reviews_count': 35
    },
    {
        'name': 'Peshawar Heritage Hostel',
        'city': 'Peshawar',
        'monthly_rent': 7500,  # PKR per month
        'description': 'Experience authentic Peshawar culture in our traditional hostel.',
        'features': ['WiFi', 'Kitchen', 'Common Area', 'Traditional Decor'],
        'rooms': 6,
        'available_seats': 18,
        'lat': 34.0151,
        'lng': 71.5249,
        'images': ['https://images.unsplash.com/photo-1507778957a35b08db50b5e10f0a6eac42df78e76?w=400&q=80'],
        'rating': 4.6,
        'reviews_count': 18
    },
    {
        'name': 'Luxury Backpackers',
        'city': 'Karachi',
        'monthly_rent': 15000,  # PKR per month
        'description': 'Premium hostel with excellent amenities and rooftop terrace.',
        'features': ['WiFi', 'Kitchen', 'Laundry', 'AC', 'Private Room Option', 'Parking'],
        'rooms': 15,
        'available_seats': 45,
        'lat': 24.8615,
        'lng': 67.0099,
        'images': ['https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=400&q=80'],
        'rating': 4.9,
        'reviews_count': 52
    },
    {
        'name': 'Sunset Garden Hostel',
        'city': 'Lahore',
        'monthly_rent': 11000,  # PKR per month
        'description': 'Peaceful hostel with garden, perfect for relaxing travelers.',
        'features': ['WiFi', 'Garden', 'Common Area', 'Hot Water', 'Kitchen'],
        'rooms': 9,
        'available_seats': 27,
        'lat': 31.5197,
        'lng': 74.3546,
        'images': ['https://images.unsplash.com/photo-1571896837934-ffe2023ba5da?w=400&q=80'],
        'rating': 4.7,
        'reviews_count': 25
    },
]

# Create or update hostels
created_count = 0
for hostel_data in hostels_data:
    city = cities[hostel_data.pop('city')]
    
    hostel, created = Hostel.objects.update_or_create(
        name=hostel_data['name'],
        defaults={
            'city': city,
            'owner': owner,
            **hostel_data
        }
    )
    
    if created:
        print(f"Created hostel: {hostel.name} - PKR {hostel.monthly_rent}/month")
        created_count += 1
    else:
        print(f"Updated hostel: {hostel.name} - PKR {hostel.monthly_rent}/month")

print(f"\n✅ Completed! Created {created_count} new hostels.")
