from rest_framework import serializers
from app.Courses.models import Course
from app.Student.models import Student

class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = '__all__'# Ajusta según los campos que desees incluir

class CoursesSerializer(serializers.ModelSerializer):
    students = StudentSerializer(many=True, read_only=True)# Incluir estudiantes registrados en el curso

    class Meta:
        model = Course
        fields = '__all__'