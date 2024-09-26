from django.http import HttpResponse
from django.shortcuts import render
from rest_framework import viewsets
from .serializers import UserSerializer
from .models import User

class UserView (viewsets.ModelViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.all()

def home_view(request):
    return HttpResponse("""<h1 style="text-align: center;">Gestión Escolar</h1>""")
