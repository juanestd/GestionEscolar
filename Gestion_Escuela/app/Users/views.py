from django.shortcuts import render, redirect
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm
from django.contrib.auth.models import User
from django.contrib.auth import login, logout, authenticate
from django.http import HttpResponse
from django.db import IntegrityError
from rest_framework import viewsets
from .serializers import UserSerializer
from .models import Usuarios

class UserView (viewsets.ModelViewSet):
    serializer_class = UserSerializer
    queryset = Usuarios.objects.all()

def home_view(request):
    return render(request, 'home.html')

def signup_view(request):

    if request.method == 'GET':
        return render(request, 'signup.html', {
        'form': UserCreationForm
    })
    else:
        if request.POST ['password1'] == request.POST ['password2']:
           try:
                user = User.objects.create_user(username = request.POST['username'],
                password = request.POST['password1'])
                user.save()
                login(request, user)
                return redirect ('profile')
           except IntegrityError:
                return render(request, 'signup.html', {
                    'form': UserCreationForm,
                    "error": 'El usuario ya existe'
                    })
        return render(request, 'signup.html', {
            'form': UserCreationForm,
            "error": 'La contraseña no coincide'
        })

def userhome(request):
    return render(request, 'profile.html')

def signout(request):
    logout(request)
    return redirect('home')

def signin(request):
    if request.method == 'GET':
        return render (request, 'signin.html', {
        'form': AuthenticationForm
    })
    else:
        user = authenticate(request, username = request.POST['username'], password = request.POST['password'])
        
        if user is None:
            return render (request, 'signin.html', {
            'form': AuthenticationForm,
            'error': 'Usuario y/o contraseña incorrecta'
        })
        else:
            login(request, user)
            return redirect('profile')
            
