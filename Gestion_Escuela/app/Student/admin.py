from django.contrib import admin
from .models import Student

@admin.register(Student)
class StudentAdmin(admin.ModelAdmin):
    list_display = ('id', 'nombre_completo', 'correo_electronico','numero_telefono')
    search_fields = ('nombre_completo', 'correo_electronico')