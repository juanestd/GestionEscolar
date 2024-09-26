from django.shortcuts import render
from rest_framework import viewsets
from .serializers import TeacherSerializer
from .models import Teacher

class TeacherView (viewsets.ModelViewSet):
    serializer_class = TeacherSerializer
    queryset = Teacher.objects.all()