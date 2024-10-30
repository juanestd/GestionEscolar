from django.test import TestCase
from app.Grades.models import Grade
from app.Student.models import Student
from app.Courses.models import Course
from app.Teachers.models import Teacher

class GradeAPITest(TestCase):
    def setUp(self):
        self.student = Student.objects.create(
            nombre_completo="Estudiante Ejemplo",
            correo_electronico="estudiante@example.com",
            numero_telefono="0987654321",
            fecha_nacimiento="2000-01-01",
            direccion="Calle Falsa 456",
            rol="Estudiante",
            nombre_usuario="estudiante123",
            contraseña="password123"
        )
        self.teacher = Teacher.objects.create(
            nombre_completo="Profesor Ejemplo",
            correo_electronico="profesor@example.com",
            numero_telefono="1234567890",
            fecha_nacimiento="1980-01-01",
            direccion="Calle Falsa 123",
            rol="Profesor",
            nombre_usuario="profesor123",
            contraseña="password123",
            departamento="Ciencias"
        )
        self.course = Course.objects.create(
            nombre_del_curso='Matemáticas',
            descripcion='Curso de matemáticas avanzadas',
            profesor=self.teacher,
            horario='Lunes y Miércoles 10:00 - 12:00'
        )
        self.grade_data = {
            'estudiante': self.student,
            'curso': self.course,
            'calificacion': 95,
            'fecha_evaluacion': '2024-10-30'
        }
        self.grade = Grade.objects.create(**self.grade_data)

    def test_create_grade(self):
        response = self.client.post('/grades/', self.grade_data)
        self.assertEqual(response.status_code, 201)

    def test_update_grade(self):
        updated_data = {'calificacion': 97}
        response = self.client.put(f'/grades/{self.grade.id}/', updated_data)
        self.assertEqual(response.status_code, 200)
        self.grade.refresh_from_db()
        self.assertEqual(self.grade.calificacion, 97)

    def test_delete_grade(self):
        response = self.client.delete(f'/grades/{self.grade.id}/')
        self.assertEqual(response.status_code, 204)
        self.assertFalse(Grade.objects.filter(id=self.grade.id).exists())
