# Generated by Django 5.1.1 on 2024-10-05 15:46

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Course',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('nombre_del_curso', models.CharField(max_length=255)),
                ('descripcion', models.TextField()),
                ('horario', models.CharField(max_length=100)),
            ],
        ),
    ]
