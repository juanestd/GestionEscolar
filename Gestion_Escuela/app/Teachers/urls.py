from django.urls import path, include
from rest_framework import routers 
from rest_framework.documentation import include_docs_urls
from app.Teachers import views

router = routers.DefaultRouter()
router.register(r'teacher',views.TeacherView,'teacher')

urlpatterns = [
    path ("teacher/v1/",include(router.urls)),
]