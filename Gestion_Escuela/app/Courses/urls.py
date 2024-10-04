from django.urls import path
from .views import CourseListCreateView, CourseDetailView, add_student_to_course

urlpatterns = [
    path('', CourseListCreateView.as_view(), name='course-list-create'),
    path('<int:pk>/', CourseDetailView.as_view(), name='course-detail'),
    path('<int:pk>/add-student/', add_student_to_course, name='add-student-to-course'),
    path('<int:pk>/students/', CourseDetailView.as_view(), name='course-students'),  
]
