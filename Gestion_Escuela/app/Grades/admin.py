
from django.contrib import admin
from .models import Grade

@admin.register(Grade)
class GradeAdmin(admin.ModelAdmin):
    list_display = ('id', 'estudiante', 'curso', 'calificacion', 'fecha_evaluacion')
    search_fields = ('estudiante__nombre_completo', 'curso__nombre_del_curso')
