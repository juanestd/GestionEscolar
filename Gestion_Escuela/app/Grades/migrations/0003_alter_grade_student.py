# Generated by Django 5.1.1 on 2024-09-26 16:10

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Grades', '0002_initial'),
        ('Student', '0003_remove_student_gender_student_address_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='grade',
            name='student',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='student_grades', to='Student.student'),
        ),
    ]