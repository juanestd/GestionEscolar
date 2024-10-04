
from django.db import models
from app.Users.models import Usuarios

class Teacher(Usuarios):  
    departamento = models.CharField(max_length=100)

    def __str__(self):
        return self.nombre_completo