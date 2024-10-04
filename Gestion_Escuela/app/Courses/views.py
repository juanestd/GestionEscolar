from rest_framework import generics
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Course
from app.Student.models import Student
from .serializers import CourseSerializer


class CourseListCreateView(generics.ListCreateAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer

class CourseDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer

@api_view(['POST'])
def add_student_to_course(request, course_id):
    try:
        course = Course.objects.get(id=course_id)  
        student_id = request.data.get('student_id')  
        student = Student.objects.get(id=student_id)  
    except (Course.DoesNotExist, Student.DoesNotExist):
        return Response({'error': 'Curso o estudiante no encontrado.'}, status=status.HTTP_404_NOT_FOUND)

    course.estudiantes.add(student)  
    course.save()

    return Response({'message': 'Estudiante agregado al curso exitosamente.'}, status=status.HTTP_200_OK)