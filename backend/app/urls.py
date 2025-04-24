from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView, TokenVerifyView # type: ignore
from . import views as app_views
from .views import Register


urlpatterns = [
    # Authentication Endpoints
    path('login/', app_views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('register/', Register.as_view(), name='register'),
    path('auth/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('auth/token/verify/', TokenVerifyView.as_view(), name='token_verify'),

]