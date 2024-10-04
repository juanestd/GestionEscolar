
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('students/', include('app.Student.urls')),
    path('teachers/', include('app.Teachers.urls')),
    path('courses/', include('app.Courses.urls')),
    path('grades/', include('app.Grades.urls')),
]
