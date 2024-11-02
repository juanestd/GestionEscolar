from django.test import TestCase
from app.Student.models import Student
from app.Courses.models import Course
from app.Grades.models import Grade
from app.Teachers.models import Teacher
from datetime import date

class StudentModelTest(TestCase):

    def setUp(self):
        
        self.profesor = Teacher.objects.create(
            nombre_completo="Profesor Ejemplo",
            correo_electronico="profesor@ejemplo.com",
            numero_telefono="123456789",
            fecha_nacimiento=date(1980, 1, 1),
            direccion="Dirección del profesor",
            rol="Profesor",
            nombre_usuario="profesor1",
            contraseña="password123",
            departamento="Matemáticas"
        )

        self.curso = Course.objects.create(
            nombre_del_curso="Matemáticas Avanzadas",
            descripcion="Curso de matemáticas avanzado",
            profesor=self.profesor,
            horario="Lunes y Miércoles 10:00-12:00"
        )


        self.estudiante = Student.objects.create(
            nombre_completo="Estudiante Ejemplo",
            correo_electronico="estudiante@ejemplo.com",
            numero_telefono="987654321",
            fecha_nacimiento=date(2005, 5, 15),
            direccion="Dirección del estudiante",
            rol="Estudiante",
            nombre_usuario="estudiante1",
            contraseña="password123"
        )

        self.estudiante.cursos.add(self.curso) 
        self.curso.estudiantes.add(self.estudiante)

    def test_student_creation(self):
        """Prueba que el estudiante se crea con los atributos heredados de Usuarios"""
        self.assertEqual(self.estudiante.nombre_completo, "Estudiante Ejemplo")
        self.assertEqual(self.estudiante.correo_electronico, "estudiante@ejemplo.com")
        self.assertEqual(self.estudiante.rol, "Estudiante")

    def test_student_courses_relation(self):
        """Prueba que el estudiante puede relacionarse con cursos correctamente"""
     
        self.assertIn(self.curso, self.estudiante.cursos.all())
    
        self.assertIn(self.estudiante, self.curso.estudiantes.all())
