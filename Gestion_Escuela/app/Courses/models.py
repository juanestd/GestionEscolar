from django.db import models
from app.Teachers.models import Teacher
from app.Student.models import Student

class Course(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()
    teacher = models.ForeignKey(Teacher, on_delete=models.CASCADE)
    schedule = models.CharField(max_length=100)
    info_students = models.ManyToManyField(Student, related_name='courses')  # Relación Muchos a muchos con estudiantes

    def __str__(self):
        return self.name + ' - By ' + str(self.teacher)
