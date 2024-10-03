# app/Courses/views.py
from rest_framework import viewsets
from .models import Course
from .serializers import CoursesSerializer

class CourseView(viewsets.ModelViewSet):
    queryset = Course.objects.all()
    serializer_class = CoursesSerializer
