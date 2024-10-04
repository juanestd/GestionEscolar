# views.py
from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Student
from .serializers import StudentSerializer, CourseSerializer  
class StudentListCreateView(generics.ListCreateAPIView):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer

class StudentDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer

class StudentCoursesView(APIView):
    def get(self, request, pk):
        try:
           
            student = Student.objects.get(id=pk)  
            
            
            courses = student.cursos.all()  
            
            
            serializer = CourseSerializer(courses, many=True)
            return Response(serializer.data)
        except Student.DoesNotExist:
            
            return Response({'error': 'Estudiante no encontrado'}, status=404)
