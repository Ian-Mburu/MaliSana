from django.shortcuts import render
from rest_framework_simplejwt.views import TokenObtainPairView # type: ignore
from . import models as project_models
from . import serializers as project_serializer
from rest_framework.generics import GenericAPIView # type: ignore
from rest_framework.response import Response # type: ignore
from rest_framework import status # type: ignore
from rest_framework.permissions import IsAuthenticated # type: ignore
from rest_framework.permissions import AllowAny # type: ignore




# Create your views here.
class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = project_serializer.MyTokenObtainPairSerializer


class Register(GenericAPIView):
    serializer_class = project_serializer.RegisterSerializer
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "User registered successfully"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
