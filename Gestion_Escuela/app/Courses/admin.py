
from django.contrib import admin
from .models import Course

@admin.register(Course)
class CourseAdmin(admin.ModelAdmin):
    list_display = ('id', 'nombre_del_curso', 'descripcion', 'profesor', 'horario')
    search_fields = ('nombre_del_curso',)
