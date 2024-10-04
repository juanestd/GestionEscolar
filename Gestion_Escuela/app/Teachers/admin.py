from django.contrib import admin
from .models import Teacher

@admin.register(Teacher)
class TeacherAdmin(admin.ModelAdmin):
    list_display = ('id', 'nombre_completo', 'correo_electronico' ,'numero_telefono', 'departamento')
    search_fields = ('nombre_completo', 'correo_electronico')
