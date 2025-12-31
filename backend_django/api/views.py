import os
import json
from django.conf import settings
from django.shortcuts import get_object_or_404
from django.db import models
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes, parser_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken

from .models import User, City, Hostel, Booking, Review
from .serializers import (
    UserSerializer,
    CitySerializer,
    HostelSerializer,
    HostelCreateSerializer,
    BookingSerializer,
    RegisterSerializer,
    ReviewSerializer,
)

import stripe

STRIPE_KEY = os.getenv('STRIPE_SECRET_KEY', '')
stripe_client = stripe if STRIPE_KEY else None
if STRIPE_KEY:
    stripe.api_key = STRIPE_KEY


def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)
    return {'access': str(refresh.access_token), 'refresh': str(refresh)}


@api_view(['GET'])
@permission_classes([AllowAny])
def root(request):
    return Response(
        {
            'message': '🏨 StayHub API - Hostel Booking Platform',
            'version': '1.0.0',
            'status': 'Running',
            'endpoints': {
                'auth': ['/api/auth/register', '/api/auth/login'],
                'browse': ['/api/cities', '/api/hostels'],
                'bookings': ['/api/create-checkout-session', '/api/bookings/confirm', '/api/bookings'],
            },
        },
        status=200,
    )


@api_view(['GET'])
@permission_classes([AllowAny])
def health(request):
    return Response({'status': 'ok'}, status=200)


@api_view(['POST'])
@permission_classes([AllowAny])
def register(request):
    serializer = RegisterSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    if User.objects.filter(email=serializer.validated_data['email']).exists():
        return Response({'detail': 'User already exists'}, status=400)
    user = serializer.save()
    tokens = get_tokens_for_user(user)
    return Response({'access': tokens['access'], 'refresh': tokens['refresh'], 'user': UserSerializer(user).data}, status=201)


@api_view(['POST'])
@permission_classes([AllowAny])
def login(request):
    email = request.data.get('email')
    password = request.data.get('password')
    
    if not email or not password:
        return Response({'detail': 'Email and password are required'}, status=400)
    
    try:
        user = User.objects.get(email=email)
    except User.DoesNotExist:
        return Response({'detail': 'Invalid email or password'}, status=401)
    
    if not user.check_password(password):
        return Response({'detail': 'Invalid email or password'}, status=401)
    
    if not user.is_active:
        return Response({'detail': 'User account is disabled'}, status=401)
    
    tokens = get_tokens_for_user(user)
    return Response({
        'access': tokens['access'], 
        'refresh': tokens['refresh'], 
        'user': UserSerializer(user).data
    }, status=200)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def me(request):
    user = request.user
    return Response(UserSerializer(user).data)


@api_view(['GET'])
@permission_classes([AllowAny])
def cities_list(request):
    qs = City.objects.all()
    return Response(CitySerializer(qs, many=True).data)


@api_view(['GET'])
@permission_classes([AllowAny])
def hostels_list(request):
    city_q = request.query_params.get('city')
    qs = Hostel.objects.all()
    if city_q:
        qs = qs.filter(city__name__icontains=city_q)
    out = []
    for h in qs:
        data = HostelSerializer(h).data
        data['price'] = (h.price or 0) / 100
        out.append(data)
    return Response(out)


class OwnerHostelsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        if request.user.role != 'owner':
            return Response({'error':'Only owners'}, status=403)
        qs = Hostel.objects.filter(owner=request.user)
        out = []
        for h in qs:
            d = HostelSerializer(h).data
            d['price'] = (h.price or 0) / 100
            out.append(d)
        return Response(out)

    def post(self, request):
        if request.user.role != 'owner':
            return Response({'error':'Only owners'}, status=403)
        ser = HostelCreateSerializer(data=request.data)
        ser.is_valid(raise_exception=True)
        city_data = ser.validated_data.pop('city') if 'city' in ser.validated_data else None
        # Accept city as id or object with id/name
        city = None
        if isinstance(city_data, dict):
            city_id = city_data.get('id')
            if city_id:
                city = get_object_or_404(City, id=city_id)
        if city is None:
            # try by name
            city_name = request.data.get('city') if isinstance(request.data.get('city'), str) else None
            if city_name:
                city, _ = City.objects.get_or_create(name=city_name)
        if city is None:
            return Response({'error':'City required'}, status=400)
        h = Hostel.objects.create(owner=request.user, city=city, price=int(float(request.data.get('price',0)) * 100), name=request.data.get('name',''), lat=request.data.get('lat'), lng=request.data.get('lng'), features=request.data.get('features') or [], images=request.data.get('images') or [], rooms=request.data.get('rooms') or 1, available_seats=request.data.get('available_seats') or 1)
        d = HostelSerializer(h).data
        d['price'] = (h.price or 0) / 100
        return Response({'success': True, 'hostel': d})


@api_view(['POST'])
@permission_classes([IsAuthenticated])
@parser_classes([MultiPartParser, FormParser])
def upload_file(request):
    if request.user.role != 'owner':
        return Response({'error':'Only owners can upload images'}, status=403)
    f = request.FILES.get('file')
    if not f:
        return Response({'error':'No file uploaded'}, status=400)
    uploads_dir = settings.MEDIA_ROOT
    os.makedirs(uploads_dir, exist_ok=True)
    filename = f"{int(__import__('time').time())}-{f.name.replace(' ','_')}"
    path = os.path.join(uploads_dir, filename)
    with open(path, 'wb') as out:
        for chunk in f.chunks():
            out.write(chunk)
    url = request.build_absolute_uri(settings.MEDIA_URL + filename)
    return Response({'url': url})


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_checkout_session(request):
    if not stripe_client:
        return Response({'error':'Stripe not configured'}, status=500)
    hostel_id = request.data.get('hostelId')
    hostel = get_object_or_404(Hostel, id=hostel_id)
    amount = hostel.price or 0
    protocol = request.META.get('HTTP_X_FORWARDED_PROTO', 'http')
    host = request.get_host()
    success_url = f"{protocol}://{host}/success?session_id={{CHECKOUT_SESSION_ID}}"
    cancel_url = f"{protocol}://{host}/cancel"
    session = stripe.checkout.Session.create(
        payment_method_types=['card'],
        mode='payment',
        line_items=[{
            'price_data':{
                'currency':'usd',
                'product_data':{'name':f'Booking: {hostel.name}'},
                'unit_amount': amount
            },
            'quantity':1
        }],
        success_url=success_url,
        cancel_url=cancel_url,
        metadata={'hostelId':hostel.id, 'userId':request.user.id, 'fromDate':request.data.get('fromDate',''), 'toDate':request.data.get('toDate','')}
    )
    return Response({'url': session.url, 'id': session.id})


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def bookings_confirm(request):
    session_id = request.data.get('sessionId')
    if not session_id:
        return Response({'error':'Missing sessionId'}, status=400)
    if not stripe_client:
        return Response({'error':'Stripe not configured'}, status=500)
    session = stripe.checkout.Session.retrieve(session_id)
    if session.payment_status != 'paid':
        return Response({'error':'Payment not completed'}, status=400)
    md = session.metadata or {}
    booking = Booking.objects.create(hostel_id=md.get('hostelId'), user_id=md.get('userId'), from_date=md.get('fromDate',''), to_date=md.get('toDate',''), status='confirmed', amount=int(float(md.get('amount', 0))), stripe_session_id=session_id)
    return Response({'id': booking.id, 'hostelId': booking.hostel_id, 'userId': booking.user_id, 'status': booking.status, 'amount': booking.amount})


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_review(request):
    hostel_id = request.data.get('hostelId')
    rating = request.data.get('rating')
    comment = request.data.get('comment', '')
    
    if not hostel_id or not rating:
        return Response({'error': 'Hostel ID and rating required'}, status=400)
    
    hostel = get_object_or_404(Hostel, id=hostel_id)
    
    try:
        review = Review.objects.create(
            hostel=hostel,
            user=request.user,
            rating=int(rating),
            comment=comment
        )
        # Update hostel rating
        avg_rating = hostel.reviews.aggregate(models.Avg('rating'))['rating__avg'] or 5.0
        hostel.rating = float(avg_rating)
        hostel.reviews_count = hostel.reviews.count()
        hostel.save()
        
        return Response(ReviewSerializer(review).data, status=201)
    except Exception as e:
        return Response({'error': str(e)}, status=400)


@api_view(['GET'])
@permission_classes([AllowAny])
def hostel_reviews(request, hostel_id):
    hostel = get_object_or_404(Hostel, id=hostel_id)
    reviews = hostel.reviews.all()
    return Response(ReviewSerializer(reviews, many=True).data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def bookings_list(request):
    qs = Booking.objects.filter(user=request.user)
    return Response(BookingSerializer(qs, many=True).data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def owner_bookings(request):
    if request.user.role != 'owner':
        return Response({'error':'Only owners'}, status=403)
    hostels = Hostel.objects.filter(owner=request.user)
    hostel_ids = [h.id for h in hostels]
    bookings = Booking.objects.filter(hostel_id__in=hostel_ids)
    enriched = []
    for b in bookings:
        hostel = b.hostel
        user = b.user
        obj = BookingSerializer(b).data
        obj['hostelName'] = hostel.name if hostel else 'Unknown'
        obj['userName'] = user.name if user else 'Unknown'
        obj['userEmail'] = user.email if user else 'Unknown'
        enriched.append(obj)
    return Response(enriched)
