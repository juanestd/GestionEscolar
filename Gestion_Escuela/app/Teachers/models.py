from django.db import models
from app.Users.models import Usuarios

class Teacher(models.Model):
    user = models.OneToOneField(Usuarios, on_delete=models.CASCADE)
    department = models.CharField(max_length=100)

    def __str__(self):
        return f"{self.user.full_name} - {self.department}"