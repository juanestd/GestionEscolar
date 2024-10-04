from django.db import models
from app.Student.models import Student
from app.Courses.models import Course

class Grade(models.Model):
    id = models.AutoField(primary_key=True)
    estudiante = models.ForeignKey(Student, on_delete=models.CASCADE, related_name='calificaciones')  
    curso = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='calificaciones')  
    calificacion = models.DecimalField(max_digits=5, decimal_places=2)
    fecha_evaluacion = models.DateField()

    def __str__(self):
        return f'{self.estudiante} - {self.curso} - {self.calificacion}'

    @property
    def profesor(self):
        return self.curso.profesor
