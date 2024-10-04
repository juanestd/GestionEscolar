from django.db import models
from app.Users.models import Usuarios
from app.Courses.models import Course

class Student(Usuarios):  # Heredamos de Usuarios
    cursos = models.ManyToManyField(Course, related_name='estudiantes')  
    calificaciones_estudiante = models.ManyToManyField('Grades.Grade', related_name='estudiantes', blank=True)  # Relación con calificaciones

    def __str__(self):
        return self.nombre_completo
