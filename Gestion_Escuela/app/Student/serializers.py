from rest_framework import serializers
from .models import Student
from app.Courses.models import Course
from app.Grades.models import Grade  

class StudentSerializer(serializers.ModelSerializer):
    cursos = serializers.PrimaryKeyRelatedField(many=True, queryset=Course.objects.all(), required=False)
    calificaciones_estudiante = serializers.PrimaryKeyRelatedField(many=True, queryset=Grade.objects.all(), required=False)

    class Meta:
        model = Student
        fields = ['id', 'nombre_completo', 'correo_electronico', 'numero_telefono', 
                  'fecha_nacimiento', 'direccion', 'rol', 'nombre_usuario', 
                  'contraseña', 'cursos', 'calificaciones_estudiante']  

    def create(self, validated_data):
        cursos = validated_data.pop('cursos', [])  
        student = super().create(validated_data)  

        for curso_id in cursos:
            student.cursos.add(curso_id)  

        return student

    def update(self, instance, validated_data):
        cursos = validated_data.pop('cursos', None)  
        instance = super().update(instance, validated_data)

        if cursos is not None:
            instance.cursos.set(cursos)  

        return instance
