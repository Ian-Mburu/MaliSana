# app/admin.py
from django.contrib import admin
from .models import *

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'type', 'user')
    list_filter = ('type', 'user')
    search_fields = ('name',)

@admin.register(Transaction)
class TransactionAdmin(admin.ModelAdmin):
    list_display = ('amount', 'category', 'date', 'user')
    list_filter = ('category', 'date')
    search_fields = ('description',)

@admin.register(Budget)
class BudgetAdmin(admin.ModelAdmin):
    list_display = ('category', 'amount', 'start_date', 'end_date', 'user')
    list_filter = ('start_date', 'end_date')

@admin.register(SavingGoal)
class SavingGoalAdmin(admin.ModelAdmin):
    list_display = ('name', 'target_amount', 'current_amount', 'deadline', 'status')
    list_filter = ('status', 'deadline')

@admin.register(Bill)
class BillAdmin(admin.ModelAdmin):
    list_display = ('name', 'amount', 'due_date', 'paid', 'recurrence')
    list_filter = ('paid', 'recurrence')

@admin.register(Notification)
class NotificationAdmin(admin.ModelAdmin):
    list_display = ('message', 'notification_type', 'read', 'created_at')
    list_filter = ('notification_type', 'read')

@admin.register(Debt)
class DebtAdmin(admin.ModelAdmin):
    list_display = ('creditor', 'total_amount', 'paid_amount', 'status')
    list_filter = ('status',)

@admin.register(Investment)
class InvestmentAdmin(admin.ModelAdmin):
    list_display = ('name', 'investment_type', 'amount_invested', 'current_value')
    list_filter = ('investment_type',)