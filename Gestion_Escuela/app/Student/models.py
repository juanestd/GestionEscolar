from django.db import models
from app.Users.models import CustomUser  

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

    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE, related_name='student_profile')
    grade = models.CharField(max_length=2, choices=GRADE_CHOICES, default='1')
    enrollment_date = models.DateField(auto_now_add=True)  # Fecha de inscripción automática al registro
    address = models.CharField(max_length=255, default="No address", blank = True, null = True)
    phone_number = models.CharField(max_length=20)

    def __str__(self):
        return f"{self.user.full_name} - Grado {self.get_grade_display()}"
