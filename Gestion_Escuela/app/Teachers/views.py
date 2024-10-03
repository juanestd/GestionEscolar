from rest_framework import viewsets
from .models import Teacher
from .serializers import TeacherSerializer

class TeacherView(viewsets.ModelViewSet):
    queryset = Teacher.objects.all()  # Asegúrate de que tu modelo esté bien definido
    serializer_class = TeacherSerializer  # Asegúrate de que tu serializador esté correctamente definido
