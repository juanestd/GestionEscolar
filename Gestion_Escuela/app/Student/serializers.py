from rest_framework import serializers
from .models import Student

class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = ['id', 'nombre_completo', 'cursos', 'calificaciones_estudiante']  
