# Generated by Django 5.1.1 on 2024-09-27 17:55

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('Student', '0005_alter_student_user'),
        ('Teachers', '0003_alter_teacher_user'),
        ('Users', '0004_rename_user_users'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='Users',
            new_name='Usuarios',
        ),
    ]