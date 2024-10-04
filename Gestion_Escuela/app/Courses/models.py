from django.db import models
from app.Teachers.models import Teacher

class Course(models.Model):
    id = models.AutoField(primary_key=True)
    nombre_del_curso = models.CharField(max_length=255)
    descripcion = models.TextField()
    profesor = models.ForeignKey(Teacher, on_delete=models.CASCADE, related_name='cursos')  
    horario = models.CharField(max_length=100)
    

    def __str__(self):
        return self.nombre_del_curso
