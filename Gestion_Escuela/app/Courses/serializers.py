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
        
        estudiantes = validated_data.pop('estudiantes', [])
        course = super().create(validated_data) 

        
        for estudiante_id in estudiantes:
            course.estudiantes.add(estudiante_id) 

        return course

    def update(self, instance, validated_data):
       
        estudiantes = validated_data.pop('estudiantes', None)

        
        instance = super().update(instance, validated_data)

        if estudiantes is not None:
            
            instance.estudiantes.set(estudiantes)  
        return instance
