from django.test import TestCase
from app.Teachers.models import Teacher

class TeacherAPITest(TestCase):
    def setUp(self):
        self.teacher_data = {
            'nombre_completo': "Profesor Ejemplo",
            'correo_electronico': "profesor_unico@example.com",
            'numero_telefono': "1234567890",
            'fecha_nacimiento': "1980-01-01",
            'direccion': "Calle Falsa 123",
            'rol': "Profesor",
            'nombre_usuario': "profesor_unico",
            'contraseña': "password123",
            'departamento': "Ciencias"
        }
        self.teacher = Teacher.objects.create(**self.teacher_data)

    def test_create_teacher(self):
        new_teacher_data = {
            'nombre_completo': "Nuevo Profesor",
            'correo_electronico': "nuevo_profesor@example.com",
            'numero_telefono': "0987654321",
            'fecha_nacimiento': "1990-01-01",
            'direccion': "Calle Nueva 456",
            'rol': "Profesor",
            'nombre_usuario': "nuevo_profesor",
            'contraseña': "newpassword123",
            'departamento': "Matemáticas"
        }
        response = self.client.post('/teachers/', new_teacher_data, content_type="application/json")
        print(response.json()) 
        self.assertEqual(response.status_code, 201)

    def test_update_teacher(self):
        updated_data = {
            'nombre_completo': 'Profesor Actualizado',
            'correo_electronico': "profesor_actualizado@example.com",
            'numero_telefono': "0987654321",
            'fecha_nacimiento': "1985-05-05",
            'direccion': "Calle Nueva 123",
            'rol': "Profesor",
            'nombre_usuario': "profesor_actualizado",
            'contraseña': "password123",
            'departamento': "Matemáticas"
        }
        response = self.client.put(f'/teachers/{self.teacher.id}/', updated_data, content_type="application/json")
        print(response.json())  
        self.assertEqual(response.status_code, 200)
        self.teacher.refresh_from_db()
        self.assertEqual(self.teacher.nombre_completo, 'Profesor Actualizado')

    def test_delete_teacher(self):
        response = self.client.delete(f'/teachers/{self.teacher.id}/')
        self.assertEqual(response.status_code, 204)
        self.assertFalse(Teacher.objects.filter(id=self.teacher.id).exists())