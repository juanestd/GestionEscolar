from rest_framework import serializers
from .models import Course

class CoursesSerializer (serializers.modelSerializer):
    class Meta:
        model = Course
        fields = '__all__'