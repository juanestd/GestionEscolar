from rest_framework import serializers
from app.Student.serializers import StudentSerializer  # Asegúrate que la ruta es correcta
from .models import Course

class CourseSerializer(serializers.ModelSerializer):
    estudiantes = StudentSerializer(many=True, read_only=True)  # Añadimos los estudiantes asociados

    class Meta:
        model = Course
        fields = ['id', 'nombre_del_curso', 'descripcion', 'profesor', 'horario', 'estudiantes']  # Incluimos estudiantes
