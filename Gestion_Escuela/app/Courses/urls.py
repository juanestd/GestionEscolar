from django.urls import path, include
from rest_framework import routers 
from rest_framework.documentation import include_docs_urls
from app.Courses import views

router = routers.DefaultRouter()
router.register(r'course',views.CourseView,'course')

urlpatterns = [
    path ("course/v1/",include(router.urls)),
]