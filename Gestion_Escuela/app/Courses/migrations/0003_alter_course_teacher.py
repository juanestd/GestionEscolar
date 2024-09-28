# Generated by Django 5.1.1 on 2024-09-26 16:10

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Courses', '0002_initial'),
        ('Teachers', '0002_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='course',
            name='teacher',
            field=models.ForeignKey(default=0, on_delete=django.db.models.deletion.CASCADE, to='Teachers.teacher'),
            preserve_default=False,
        ),
    ]