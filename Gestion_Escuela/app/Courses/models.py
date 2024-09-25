from django.db import models
from app.Teachers.models import Teacher

class Course(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()
    teacher = models.ForeignKey(Teacher, on_delete=models.SET_NULL, null=True)
    schedule = models.CharField(max_length=100)

    def __str__(self):
        return self.name