from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView, TokenVerifyView # type: ignore
from . import views as products_views

urlpatterns = [
    # Authentication Endpoints
    path('auth/login/', products_views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('auth/register/', products_views.RegisterView.as_view(), name='register'),
    path('auth/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('auth/token/verify/', TokenVerifyView.as_view(), name='token_verify'),

]