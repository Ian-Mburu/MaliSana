from django.urls import path, include
from rest_framework_simplejwt.views import TokenRefreshView, TokenVerifyView # type: ignore
from . import views as app_views
from .views import *
from rest_framework.routers import DefaultRouter # type: ignore
from .views import Register, DashboardView





urlpatterns = [
    # Authentication Endpoints
    path('login/', app_views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('register/', Register.as_view(), name='register'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('token/verify/', TokenVerifyView.as_view(), name='token_verify'),
    path('dashboard/', DashboardView.as_view(), name='dashboard'),

    # API Endpoints
    path('categories/', app_views.CategoryViewSet.as_view(), name='category-list'),
    path('categories/<int:pk>/', app_views.CategoryViewSet.as_view(), name='category-detail'),

    path('transactions/', app_views.TransactionViewSet.as_view(), name='transaction-list'),
    path('transactions/<int:pk>/', app_views.TransactionViewSet.as_view(), name='transaction-detail'),

    path('budgets/', app_views.BudgetViewSet.as_view(), name='budget-list'),
    path('budgets/<int:pk>/', app_views.BudgetViewSet.as_view(), name='budget-detail'),

    path('saving-goals/', app_views.SavingGoalViewSet.as_view(), name='savinggoal-list'),
    path('saving-goals/<int:pk>/', app_views.SavingGoalViewSet.as_view(), name='savinggoal-detail'),

    path('bills/', app_views.BillViewSet.as_view(), name='bill-list'),
    path('bills/<int:pk>/', app_views.BillViewSet.as_view(), name='bill-detail'),

    path('notifications/', app_views.NotificationViewSet.as_view(), name='notification-list'),
    path('notifications/<int:pk>/', app_views.NotificationViewSet.as_view(), name='notification-detail'),

    path('debts/', app_views.DebtViewSet.as_view(), name='debt-list'),
    path('debts/<int:pk>/', app_views.DebtViewSet.as_view(), name='debt-detail'),

    path('investments/', app_views.InvestmentViewSet.as_view(), name='investment-list'),
    path('investments/<int:pk>/', app_views.InvestmentViewSet.as_view(), name='investment-detail'),
]