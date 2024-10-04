from django.db import models
from app.Users.models import Usuarios

class Student(Usuarios):
    cursos = models.ManyToManyField('Courses.Course', related_name='estudiantes_en_estudiante', blank=True)  

    calificaciones_estudiante = models.ManyToManyField('Grades.Grade', related_name='estudiantes', blank=True)

    def __str__(self):
        return self.nombre_completo
