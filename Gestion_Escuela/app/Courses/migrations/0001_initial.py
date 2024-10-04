# Generated by Django 5.1.1 on 2024-10-04 01:03

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('Teachers', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Course',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('nombre_del_curso', models.CharField(max_length=255)),
                ('descripcion', models.TextField()),
                ('horario', models.CharField(max_length=100)),
                ('profesor', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='cursos', to='Teachers.teacher')),
            ],
        ),
    ]
