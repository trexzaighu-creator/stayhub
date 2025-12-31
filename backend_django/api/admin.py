from django.contrib import admin
from .models import User, City, Hostel, Booking, Review

@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ('email','name','role')


@admin.register(City)
class CityAdmin(admin.ModelAdmin):
    list_display = ('name',)


@admin.register(Hostel)
class HostelAdmin(admin.ModelAdmin):
    list_display = ('name','city','monthly_rent','owner','available_seats')


@admin.register(Booking)
class BookingAdmin(admin.ModelAdmin):
    list_display = ('id','hostel','user','status','amount','created_at')


@admin.register(Review)
class ReviewAdmin(admin.ModelAdmin):
    list_display = ('hostel','user','rating','created_at')
