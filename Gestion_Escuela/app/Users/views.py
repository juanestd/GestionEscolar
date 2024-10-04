# app/Users/views.py

from django.views.generic import ListView
from .models import Usuarios

class UsuariosListView(ListView):
    model = Usuarios
    template_name = 'users/usuarios_list.html'  