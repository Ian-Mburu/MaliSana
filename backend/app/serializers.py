from rest_framework_simplejwt.serializers import TokenObtainPairSerializer # type: ignore
from rest_framework import serializers # type: ignore
from django.contrib.auth.password_validation import validate_password # type: ignore
from . import models as project_models





class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def get_token(cls, user):
        token = super().get_token(user)
        # Add custom claims
        token['username'] = user.username
        token['email'] = user.email
        token['full_name'] = user.full_name
        token['tel_no'] = user.tel_no

        return token


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)


    class Meta:
        model = project_models.User
        fields = ['username', 'email', 'full_name', 'tel_no', 'password', 'password2']

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({"password": "Password fields didn't match."})
        return attrs
    
    def create(self, validated_data):
        user = project_models.User.objects.create(
            username=validated_data['username'],
            email=validated_data['email'],
            full_name=validated_data['full_name'],
            tel_no=validated_data['tel_no'],
            password=validated_data['password']

        )

        return user
        