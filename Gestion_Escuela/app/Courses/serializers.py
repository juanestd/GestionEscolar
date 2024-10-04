# serializers.py
from rest_framework import serializers
from .models import Course
from app.Student.models import Student

class CourseSerializer(serializers.ModelSerializer):
    estudiantes = serializers.PrimaryKeyRelatedField(many=True, queryset=Student.objects.all(), required=False)

    class Meta:
        model = Course
        fields = '__all__'

    def create(self, validated_data):
        # Extrae la lista de estudiantes de los datos validados
        estudiantes = validated_data.pop('estudiantes', [])
        course = super().create(validated_data)  # Crea el curso

        # Agrega los estudiantes al curso
        for estudiante_id in estudiantes:
            course.estudiantes.add(estudiante_id)  # Usa el método add para añadir estudiantes

        return course

    def update(self, instance, validated_data):
        # Extrae la lista de estudiantes de los datos validados
        estudiantes = validated_data.pop('estudiantes', None)

        # Actualiza el resto de los campos del curso
        instance = super().update(instance, validated_data)

        if estudiantes is not None:
            # Agrega los nuevos estudiantes sin eliminar los existentes
            instance.estudiantes.set(estudiantes)  # Usa el método set para reemplazar la lista de estudiantes
        return instance
