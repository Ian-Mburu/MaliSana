from django.contrib import admin

# Register your models here.
from app import models as project_models


class UserAdmin(admin.ModelAdmin):
    list_display = ('username', 'email', 'full_name', 'tel_no')
    search_fields = ('username', 'email', 'full_name', 'tel_no')
    ordering = ('username',)
    list_filter = ('is_staff', 'is_active')

admin.site.register(project_models.User, UserAdmin)
# Register other models as needed