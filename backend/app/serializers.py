from rest_framework_simplejwt.serializers import TokenObtainPairSerializer # type: ignore
from rest_framework import serializers # type: ignore
from django.contrib.auth.password_validation import validate_password # type: ignore
from . import models as project_models
from django.contrib.auth import get_user_model



User = get_user_model()

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        del self.fields[self.username_field]
        self.fields['tel_no'] = serializers.CharField()
        self.fields['password'] = serializers.CharField(write_only=True)

    def validate(self, attrs):
        # Map tel_no to username_field for parent validation
        attrs[self.username_field] = attrs.pop('tel_no')
        return super().validate(attrs)

    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['tel_no'] = user.tel_no
        token['email'] = user.email
        token['full_name'] = user.full_name
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
        user = project_models.User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            full_name=validated_data['full_name'],
            tel_no=validated_data['tel_no'],
            password=validated_data['password']
        )
        return user
        

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = project_models.Category
        fields = '__all__'
        read_only_fields = ('user',)

    def validate(self, data):
        if data['type'] not in ['expense', 'income']:
            raise serializers.ValidationError("Type must be either 'expense' or 'income'.")
        return data
    

class TransactionSerializer(serializers.ModelSerializer):
    category = serializers.SlugRelatedField(
        slug_field='name',
        queryset=project_models.Category.objects.all()
    )

    class Meta:
        model = project_models.Transaction
        fields = '__all__'
        read_only_fields = ('user', 'created_at')


class BudgetSerializer(serializers.ModelSerializer):
    class Meta:
        model = project_models.Budget
        fields = '__all__'
        read_only_fields = ('user', 'created_at')

    def validate(self, data):
        if data['start_date'] > data['end_date']:
            raise serializers.ValidationError("Start date must be before end date.")
        return data
    
class SavingGoalSerializer(serializers.ModelSerializer):
    class Meta:
        model = project_models.SavingGoal
        fields = '__all__'
        read_only_fields = ('user', 'created_at', 'status')

class BillSerializer(serializers.ModelSerializer):
    class Meta:
        model = project_models.Bill
        fields = '__all__'
        read_only_fields = ('user', 'created_at')

class NotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = project_models.Notification
        fields = '__all__'
        read_only_fields = ('user', 'created_at')

class DebtSerializer(serializers.ModelSerializer):
    class Meta:
        model = project_models.Debt
        fields = '__all__'
        read_only_fields = ('user', 'created_at')

class InvestmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = project_models.Investment
        fields = '__all__'
        read_only_fields = ('user', 'created_at')

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'full_name', 'tel_no']