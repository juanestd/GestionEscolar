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

        self.grade = Grade.objects.create(
            estudiante=self.student,
            curso=self.course,
            calificacion=95,
            fecha_evaluacion='2024-10-30'
        )

        self.grade_data = {
            'estudiante': self.student.id, 
            'curso': self.course.id,        
            'calificacion': 95,
            'fecha_evaluacion': '2024-10-30'
        }


    def test_create_grade(self):
        self.grade_data = {
            'estudiante': self.student.id,
            'curso': self.course.id,        
            'calificacion': 95,
            'fecha_evaluacion': '2024-10-30'
        }
        response = self.client.post('/grades/', self.grade_data, content_type='application/json')
        self.assertEqual(response.status_code, 201)

        self.assertTrue(Grade.objects.filter(calificacion=95, estudiante=self.student).exists())


    def test_update_grade(self):
        updated_data = {
            'estudiante': self.grade.estudiante.id,  
            'curso': self.grade.curso.id, 
            'calificacion': 97,
            'fecha_evaluacion': self.grade.fecha_evaluacion  
        }
        response = self.client.put(f'/grades/{self.grade.id}/', updated_data, content_type='application/json')
        print(response.data)  
        self.assertEqual(response.status_code, 200)
        self.grade.refresh_from_db()
        self.assertEqual(self.grade.calificacion, 97)



    def test_delete_grade(self):
        response = self.client.delete(f'/grades/{self.grade.id}/')
        self.assertEqual(response.status_code, 204)
        self.assertFalse(Grade.objects.filter(id=self.grade.id).exists())


# py manage.py test app.Grades.tests.GradeAPITest.test_create_grade -- OK
# py manage.py test app.Grades.tests.GradeAPITest.test_update_grade -- OK
# py manage.py test app.Grades.tests.GradeAPITest.test_delete_grade -- OK