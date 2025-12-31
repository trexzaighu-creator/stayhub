from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from . import views

urlpatterns = [
    path('health', views.health),
    path('auth/register', views.register),
    path('auth/login', views.login, name='login'),
    path('auth/refresh', TokenRefreshView.as_view(), name='token_refresh'),
    path('me', views.me),
    path('cities', views.cities_list),
    path('hostels', views.hostels_list),
    path('hostels/<str:hostel_id>/reviews', views.hostel_reviews),
    path('reviews/add', views.add_review),
    path('owner/hostels', views.OwnerHostelsView.as_view()),
    path('upload', views.upload_file),
    path('create-checkout-session', views.create_checkout_session),
    path('bookings/confirm', views.bookings_confirm),
    path('bookings', views.bookings_list),
    path('owner/bookings', views.owner_bookings),
]
