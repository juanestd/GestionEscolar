from django.db import models
from app.Users.models import User  

class Student(models.Model):
    GRADE_CHOICES = [
        ('1', 'Grado Primero'),
        ('2', 'Grado Segundo'),
        ('3', 'Grado Tercero'),
        ('4', 'Grado Cuarto'),
        ('5', 'Grado Quinto'),
        ('6', 'Grado Sexto'),
        ('7', 'Grado Séptimo'),
        ('8', 'Grado Octavo'),
        ('9', 'Grado Noveno'),
        ('10', 'Grado Décimo'),
        ('11', 'Grado Once'),
    ]

    user = models.OneToOneField(User, on_delete=models.CASCADE)
    grade = models.CharField(max_length=2, choices=GRADE_CHOICES)

    def __str__(self):
        return f"{self.user.full_name} - Grado {self.get_grade_display()}"
