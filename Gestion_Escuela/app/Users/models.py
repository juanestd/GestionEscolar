from django.contrib.auth.models import AbstractUser
from django.db import models

class CustomUser(AbstractUser):
    full_name = models.CharField(max_length=255)
    phone_number = models.CharField(max_length=20)
    birth_date = models.DateField()
    address = models.TextField()
    role = models.CharField(max_length=50, choices=[('Student', 'Student'), ('Teacher', 'Teacher'), ('Admin', 'Admin')])

    # Agregamos related_name para evitar conflictos
    groups = models.ManyToManyField(
        'auth.Group',
        related_name='customuser_groups',  # related_name personalizado para evitar conflicto con auth.User
        blank=True,
    )
    user_permissions = models.ManyToManyField(
        'auth.Permission',
        related_name='customuser_permissions',  # related_name personalizado para evitar conflicto con auth.User
        blank=True,
    )

    def __str__(self):
        return self.username
