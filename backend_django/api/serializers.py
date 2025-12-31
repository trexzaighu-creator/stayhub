from rest_framework import serializers
from .models import User, City, Hostel, Booking, Review


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'name', 'email', 'role')


class RegisterSerializer(serializers.Serializer):
    name = serializers.CharField(required=False, allow_blank=True)
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True, min_length=6)
    role = serializers.ChoiceField(choices=('user','owner','admin'), default='user')

    def create(self, validated_data):
        from .models import User
        return User.objects.create_user(
            email=validated_data['email'],
            password=validated_data['password'],
            name=validated_data.get('name',''),
            role=validated_data.get('role','user')
        )


class CitySerializer(serializers.ModelSerializer):
    class Meta:
        model = City
        fields = ('id', 'name')


class ReviewSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    
    class Meta:
        model = Review
        fields = ('id', 'user', 'rating', 'comment', 'created_at')


class HostelSerializer(serializers.ModelSerializer):
    city = CitySerializer()
    owner = UserSerializer(read_only=True)
    reviews = ReviewSerializer(many=True, read_only=True)
    available_count = serializers.SerializerMethodField()
    booked_count = serializers.SerializerMethodField()

    def get_available_count(self, obj):
        from django.utils import timezone
        from datetime import datetime
        active_bookings = obj.bookings.filter(status__in=['confirmed', 'checked_in']).count()
        return max(0, obj.available_seats - active_bookings)
    
    def get_booked_count(self, obj):
        return obj.bookings.filter(status__in=['confirmed', 'checked_in']).count()

    class Meta:
        model = Hostel
        fields = ('id','name','city','monthly_rent','lat','lng','features','owner','images','rooms','available_seats','description','rating','reviews_count','reviews','available_count','booked_count')


class HostelCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Hostel
        fields = ('name','city','monthly_rent','lat','lng','features','images','rooms','available_seats','description')


class BookingSerializer(serializers.ModelSerializer):
    hostel = HostelSerializer(read_only=True)
    user = UserSerializer(read_only=True)
    
    class Meta:
        model = Booking
        fields = ('id','hostel','user','from_date','to_date','status','amount','created_at','updated_at')
        model = Booking
        fields = '__all__'
