from django.shortcuts import render
from rest_framework_simplejwt.views import TokenObtainPairView # type: ignore
from project import serializers as project_serializer
from . models import models as project_models
from rest_framework.generics import GenericAPIView # type: ignore
from rest_framework.response import Response # type: ignore
from rest_framework import status # type: ignore
from rest_framework.permissions import IsAuthenticated # type: ignore




# Create your views here.
class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = project_serializer.MyTokenObtainPairSerializer


class Register(GenericAPIView):
    queryset = project_models.User.objects.all()
    serializer_class = project_serializer.RegisterSerializer
    permission_classes = [IsAuthenticated,]

    def create(self, request, *args, **kwargs):
        print("Received Data:", request.data)  # Debugging
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            return Response({"message": "User registered successfully"}, status=status.HTTP_201_CREATED)
        print("Errors:", serializer.errors)  # Debugging
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
