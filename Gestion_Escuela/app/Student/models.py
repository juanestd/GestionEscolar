from django.db import models
from app.Users.models import CustomUser

class Student(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE)
    grade = models.CharField(max_length=50)
    gender = models.CharField(max_length=10)

    def __str__(self):
        return self.user.full_name
