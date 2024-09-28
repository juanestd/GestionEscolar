from django.contrib.auth.models import AbstractUser
from django.db import models

class Usuarios(models.Model):
    full_name = models.CharField(max_length=255)
    email = models.EmailField(unique=True)
    phone_number = models.CharField(max_length=20)
    birth_date = models.DateField()
    address = models.TextField()
    role = models.CharField(max_length=50)  # Ej: Estudiante, Profesor, Administrativo
    username = models.CharField(max_length=150, unique=True)
    password = models.CharField(max_length=128)

    def __str__(self):
        return self.full_name