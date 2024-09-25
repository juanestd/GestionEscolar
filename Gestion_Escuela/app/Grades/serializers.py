from rest_framework import serializers
from .models import Grade

class StudentSerializer (serializers.modelSerializer):
    class Meta:
        model = Grade
        fields = '__all__'