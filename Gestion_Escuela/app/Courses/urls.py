from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CourseView

router = DefaultRouter()
router.register(r'courses', CourseView, basename='course')

urlpatterns = [
    path('v1/', include(router.urls)),  # Incluye las rutas para la API de cursos
]