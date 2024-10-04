from django.contrib import admin
from .models import Usuarios

@admin.register(Usuarios)
class UsuariosAdmin(admin.ModelAdmin):
    list_display = ('id', 'nombre_completo', 'correo_electronico', 'rol', 'nombre_usuario')
    search_fields = ('nombre_completo', 'correo_electronico', 'nombre_usuario')
