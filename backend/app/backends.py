from django.contrib.auth.backends import ModelBackend
from django.contrib.auth import get_user_model

class TelNoBackend(ModelBackend):
    def authenticate(self, request, tel_no=None, password=None, **kwargs):
        User = get_user_model()
        try:
            user = User.objects.get(tel_no=tel_no)
            if user.check_password(password):
                return user
        except User.DoesNotExist:
            return None
        return None