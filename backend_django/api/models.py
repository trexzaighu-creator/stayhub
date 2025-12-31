import uuid
from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager


def gen_id():
    return str(uuid.uuid4())


class UserManager(BaseUserManager):
    use_in_migrations = True

    def _create_user(self, email, password, **extra_fields):
        if not email:
            raise ValueError('The given email must be set')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_user(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', False)
        extra_fields.setdefault('is_superuser', False)
        return self._create_user(email, password, **extra_fields)

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        return self._create_user(email, password, **extra_fields)


class User(AbstractBaseUser, PermissionsMixin):
    id = models.CharField(primary_key=True, max_length=50, default=gen_id, editable=False)
    name = models.CharField(max_length=200, blank=True)
    email = models.EmailField(unique=True)
    role = models.CharField(max_length=20, choices=(('user','user'),('owner','owner'),('admin','admin')), default='user')
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    date_joined = models.DateTimeField(auto_now_add=True)

    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    def __str__(self):
        return self.email


class City(models.Model):
    id = models.CharField(primary_key=True, max_length=50, default=gen_id, editable=False)
    name = models.CharField(max_length=200)

    def __str__(self):
        return self.name


class Hostel(models.Model):
    id = models.CharField(primary_key=True, max_length=50, default=gen_id, editable=False)
    name = models.CharField(max_length=300)
    city = models.ForeignKey(City, on_delete=models.CASCADE, related_name='hostels')
    monthly_rent = models.IntegerField(default=0)  # monthly rent in PKR
    lat = models.FloatField(null=True, blank=True)
    lng = models.FloatField(null=True, blank=True)
    features = models.JSONField(default=list, blank=True)
    owner = models.ForeignKey('User', on_delete=models.SET_NULL, null=True, blank=True, related_name='hostels')
    images = models.JSONField(default=list, blank=True)
    rooms = models.IntegerField(default=1)
    available_seats = models.IntegerField(default=1)
    description = models.TextField(blank=True, default='')
    rating = models.FloatField(default=5.0)
    reviews_count = models.IntegerField(default=0)

    def __str__(self):
        return self.name


class Booking(models.Model):
    BOOKING_STATUS = (
        ('pending', 'Pending'),
        ('confirmed', 'Confirmed'),
        ('checked_in', 'Checked In'),
        ('checked_out', 'Checked Out'),
        ('cancelled', 'Cancelled'),
    )
    id = models.CharField(primary_key=True, max_length=50, default=gen_id, editable=False)
    hostel = models.ForeignKey(Hostel, on_delete=models.CASCADE, related_name='bookings')
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='bookings')
    from_date = models.CharField(max_length=50, blank=True)
    to_date = models.CharField(max_length=50, blank=True)
    status = models.CharField(max_length=50, choices=BOOKING_STATUS, default='pending')
    stripe_session_id = models.CharField(max_length=200, blank=True)
    amount = models.IntegerField(default=0)  # Amount paid in PKR
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"Booking {self.id} by {self.user.email}"


class Review(models.Model):
    id = models.CharField(primary_key=True, max_length=50, default=gen_id, editable=False)
    hostel = models.ForeignKey(Hostel, on_delete=models.CASCADE, related_name='reviews')
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='reviews')
    rating = models.IntegerField(choices=[(1, '1'), (2, '2'), (3, '3'), (4, '4'), (5, '5')])
    comment = models.TextField(blank=True, default='')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']
        unique_together = ('hostel', 'user')

    def __str__(self):
        return f"Review by {self.user.email} for {self.hostel.name}"
