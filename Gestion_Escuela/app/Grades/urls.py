from django.urls import path, include
from rest_framework import routers 
from rest_framework.documentation import include_docs_urls
from app.Grades import views

router = routers.DefaultRouter()
router.register(r'grade',views.GradeView,'grade')

urlpatterns = [
    path ("grade/v1/",include(router.urls)),
]