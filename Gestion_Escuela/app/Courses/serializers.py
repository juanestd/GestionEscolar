
from rest_framework import serializers
from app.Courses.models import Course
from app.Teachers.serializers import TeacherSerializer
from app.Student.serializers import StudentSerializer

class CoursesSerializer(serializers.ModelSerializer):
    teacher = TeacherSerializer()  # Serializador para el profesor
    students = StudentSerializer(many=True, source='info_students')  # Incluir estudiantes registrados en el curso

    class Meta:
        model = Course
        fields = '__all__'
