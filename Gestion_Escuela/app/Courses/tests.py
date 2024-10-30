from django.test import TestCase
from rest_framework.test import APIClient
from rest_framework import status
from django.urls import reverse
from .models import Course
from app.Teachers.models import Teacher

class CourseAPITest(TestCase):

    def setUp(self):
        self.client = APIClient()
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
        self.course_data = {
            'nombre_del_curso': 'Quimica',
            'descripcion': 'Curso de química avanzada',
            'profesor': self.teacher,  
            'horario': 'Lunes y Miércoles 8:00 - 10:00'
        }
        self.course = Course.objects.create(**self.course_data)

        self.create_url = reverse('course-list-create')
        self.detail_url = reverse('course-detail', args=[self.course.id])

    def test_create_course(self):
        response = self.client.post(self.create_url, self.course_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)


    def test_update_course(self):
        updated_data = {
            'nombre_del_curso': 'Química Básica',
            'descripcion': 'Curso de introducción a la química',
            'profesor': self.teacher.id,
            'horario': 'Viernes 8:00 - 10:00'
        }
        response = self.client.put(self.detail_url, updated_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['nombre_del_curso'], 'Química Básica')


    def test_partial_update_course(self):
        partial_data = {'descripcion': 'Curso de química para principiantes'}
        response = self.client.patch(self.detail_url, partial_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['descripcion'], 'Curso de química para principiantes')


    def test_delete_course(self):
        response = self.client.delete(self.detail_url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertFalse(Course.objects.filter(id=self.course.id).exists())
        
'''
py manage.py test app.Courses.tests.CourseAPITest.test_create_course
py manage.py test app.Courses.tests.CourseAPITest.test_update_course
py manage.py test app.Courses.tests.CourseAPITest.test_partial_update_course
py manage.py test app.Courses.tests.CourseAPITest.test_delete_course
'''

