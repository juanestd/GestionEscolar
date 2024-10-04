# Generated by Django 5.1.1 on 2024-10-04 01:03

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('Courses', '0001_initial'),
        ('Grades', '0001_initial'),
        ('Users', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Student',
            fields=[
                ('usuarios_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='Users.usuarios')),
                ('calificaciones_estudiante', models.ManyToManyField(blank=True, related_name='estudiantes', to='Grades.grade')),
                ('cursos', models.ManyToManyField(related_name='estudiantes', to='Courses.course')),
            ],
            bases=('Users.usuarios',),
        ),
    ]
