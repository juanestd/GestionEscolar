from rest_framework import serializers
from .models import CustomUser

class StudentSerializer (serializers.modelSerializer):
    class Meta:
        model = CustomUser
        fields = '__all__'