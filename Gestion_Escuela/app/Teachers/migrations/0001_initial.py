# Generated by Django 5.1.1 on 2024-10-04 02:36

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('Users', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Teacher',
            fields=[
                ('usuarios_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='Users.usuarios')),
                ('departamento', models.CharField(max_length=100)),
            ],
            bases=('Users.usuarios',),
        ),
    ]
