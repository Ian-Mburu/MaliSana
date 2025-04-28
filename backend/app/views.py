from django.shortcuts import render
from rest_framework_simplejwt.views import TokenObtainPairView # type: ignore
from . import models as project_models
from .models import *
from django.db.models import Sum
from . import serializers as project_serializer
from rest_framework.generics import GenericAPIView # type: ignore
from rest_framework.response import Response # type: ignore
from rest_framework import generics, permissions, status # type: ignore
from rest_framework import status # type: ignore
from rest_framework.permissions import IsAuthenticated # type: ignore
from rest_framework.permissions import AllowAny # type: ignore
from django.utils import timezone
from rest_framework.views import APIView # type: ignore
from rest_framework.decorators import action # type: ignore
from rest_framework import viewsets # type: ignore




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


class CategoryViewSet(generics.ListCreateAPIView, generics.RetrieveUpdateDestroyAPIView):
    serializer_class = project_serializer.CategorySerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        return project_models.Category.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    
class TransactionViewSet(generics.ListCreateAPIView, generics.RetrieveUpdateDestroyAPIView):
    serializer_class = project_serializer.TransactionSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        return project_models.Transaction.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    
class BudgetViewSet(generics.ListCreateAPIView, generics.RetrieveUpdateDestroyAPIView):
    serializer_class = project_serializer.BudgetSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        return project_models.Budget.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    
class SavingGoalViewSet(generics.ListCreateAPIView,
                        generics.RetrieveUpdateDestroyAPIView):
    serializer_class = project_serializer.SavingGoalSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        return project_models.SavingGoal.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class BillViewSet(generics.ListCreateAPIView,
                  generics.RetrieveUpdateDestroyAPIView):
    serializer_class = project_serializer.BillSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        return project_models.Bill.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class NotificationViewSet(generics.ListAPIView,
                         generics.UpdateAPIView):
    serializer_class = project_serializer.NotificationSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        return project_models.Notification.objects.filter(user=self.request.user)

    def patch(self, request, *args, **kwargs):
        project_models.Notification.objects.filter(user=request.user, read=False).update(read=True)
        return Response({'status': 'all notifications marked as read'})
    
    def list(self, request):
        notifications = project_models.Notification.objects.filter(user=request.user)
        serializer = project_serializer.NotificationSerializer(notifications, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['patch'], url_path='mark-all-read')
    def mark_all_as_read(self, request):
        project_models.Notification.objects.filter(user=request.user, read=False).update(read=True)
        return Response({'status': 'all notifications marked as read'})

class DebtViewSet(generics.ListCreateAPIView,
                  generics.RetrieveUpdateDestroyAPIView):
    serializer_class = project_serializer.DebtSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        return project_models.Debt.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class InvestmentViewSet(generics.ListCreateAPIView,
                        generics.RetrieveUpdateDestroyAPIView):
    serializer_class = project_serializer.InvestmentSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        return project_models.Investment.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class DashboardView(APIView):
    permissions_classes = [AllowAny]

    def get(self, request):
        user = request.user
        data = {
            'total_savings': SavingGoal.objects.filter(user=user).aggregate(Sum('current_amount'))['current_amount__sum'] or 0,
            'total_debt': Debt.objects.filter(user=user).aggregate(Sum('total_amount'))['total_amount__sum'] or 0,
            'monthly_spending': Transaction.objects.filter(
                user=user,
                date__month=timezone.now().month
            ).aggregate(Sum('amount'))['amount__sum'] or 0,
            'active_budgets': Budget.objects.filter(user=user, end_date__gte=timezone.now()).count(),
            'pending_bills': Bill.objects.filter(user=user, paid=False).count()
        }
        return Response(data)