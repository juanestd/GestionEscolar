from rest_framework import serializers
from .models import Course
from app.Student.serializers import StudentSerializer  

class CourseSerializer(serializers.ModelSerializer):
    estudiantes = StudentSerializer(many=True, read_only=True)  

    class Meta:
        model = Course
        fields = '__all__' 