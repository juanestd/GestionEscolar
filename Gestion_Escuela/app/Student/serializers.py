# serializers.py
from rest_framework import serializers
from .models import Student
from app.Courses.models import Course
from app.Grades.models import Grade  # Asegúrate de importar el modelo de calificaciones

class StudentSerializer(serializers.ModelSerializer):
    cursos = serializers.PrimaryKeyRelatedField(many=True, queryset=Course.objects.all(), required=False)
    calificaciones_estudiante = serializers.PrimaryKeyRelatedField(many=True, queryset=Grade.objects.all(), required=False)

    class Meta:
        model = Student
        fields = ['id', 'nombre_completo', 'cursos', 'calificaciones_estudiante']  

    def create(self, validated_data):
        cursos = validated_data.pop('cursos', [])  # Extraemos cursos de los datos
        student = super().create(validated_data)  # Creamos el estudiante

        # Añadimos los cursos al estudiante
        for curso_id in cursos:
            student.cursos.add(curso_id)  # Añadimos cada curso

        return student

    def update(self, instance, validated_data):
        cursos = validated_data.pop('cursos', None)  # Extraemos cursos de los datos

        # Actualizamos los datos del estudiante
        instance = super().update(instance, validated_data)

        if cursos is not None:
            # Añadimos nuevos cursos sin eliminar los existentes
            instance.cursos.set(cursos)  # Usamos 'set' para reemplazar los cursos

        return instance
