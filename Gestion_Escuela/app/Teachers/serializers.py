from rest_framework import serializers
from .models import Teacher

class StudentSerializer (serializers.modelSerializer):
    class Meta:
        model = Teacher
        fields = '__all__'