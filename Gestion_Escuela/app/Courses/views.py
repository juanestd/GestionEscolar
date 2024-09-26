from django.shortcuts import render
from rest_framework import viewsets
from .serializers import CoursesSerializer
from .models import Course

class CourseView (viewsets.ModelViewSet):
    serializer_class = CoursesSerializer
    queryset = Course.objects.all()
