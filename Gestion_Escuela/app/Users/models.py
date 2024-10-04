from django.db import models

class Usuarios(models.Model):
    id = models.AutoField(primary_key=True)
    nombre_completo = models.CharField(max_length=255)
    correo_electronico = models.EmailField(unique=True)
    numero_telefono = models.CharField(max_length=20)
    fecha_nacimiento = models.DateField()
    direccion = models.CharField(max_length=255)
    rol = models.CharField(max_length=50, choices=[
        ('Estudiante', 'Estudiante'),
        ('Profesor', 'Profesor'),
        ('Administrativo', 'Administrativo'),
    ])
    nombre_usuario = models.CharField(max_length=50, unique=True)
    contraseña = models.CharField(max_length=255)

    def __str__(self):
        return self.nombre_completo
