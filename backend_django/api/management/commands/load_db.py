from django.core.management.base import BaseCommand
from django.conf import settings
from pathlib import Path
import json

from api.models import City, Hostel


class Command(BaseCommand):
    help = 'Load initial data from server/db.json into Django DB'

    def handle(self, *args, **options):
        base = Path(settings.BASE_DIR).parent
        dbpath = base / 'server' / 'db.json'
        if not dbpath.exists():
            self.stderr.write(f'Database file not found: {dbpath}')
            return
        with open(dbpath, 'r', encoding='utf-8') as f:
            data = json.load(f)

        cities = data.get('cities', [])
        hostels = data.get('hostels', [])

        for c in cities:
            cid = c.get('_id') or c.get('id')
            name = c.get('name')
            if not cid or not name:
                continue
            City.objects.update_or_create(id=str(cid), defaults={'name': name})

        for h in hostels:
            hid = h.get('_id') or h.get('id')
            name = h.get('name')
            city_name = h.get('city')
            price = int(h.get('price') or 0)
            lat = h.get('lat')
            lng = h.get('lng')
            features = h.get('features') or []
            if not hid or not name or not city_name:
                continue
            city, _ = City.objects.get_or_create(name=city_name)
            Hostel.objects.update_or_create(
                id=str(hid),
                defaults={
                    'name': name,
                    'city': city,
                    'price': price,
                    'lat': lat,
                    'lng': lng,
                    'features': features,
                }
            )

        self.stdout.write(self.style.SUCCESS('Imported cities and hostels from db.json'))
