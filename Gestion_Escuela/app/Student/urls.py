
from django.urls import path
from .views import StudentListCreateView, StudentDetailView, StudentCoursesView

urlpatterns = [
    path('', StudentListCreateView.as_view(), name='student-list-create'),
    path('<int:pk>/', StudentDetailView.as_view(), name='student-detail'),
    path('<int:pk>/courses/', StudentCoursesView.as_view(), name='student-courses'),  
]
