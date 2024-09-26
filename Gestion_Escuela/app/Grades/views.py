from django.shortcuts import render
from rest_framework import viewsets
from .serializers import GradesSerializer
from .models import Grade

class GradeView (viewsets.ModelViewSet):
    serializer_class = GradesSerializer
    queryset = Grade.objects.all()
