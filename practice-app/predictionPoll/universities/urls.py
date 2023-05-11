from django.urls import path
from . import views

urlpatterns = [
    path('listall', views.getUniversitiesInTurkey),
    path('list', views.listUniversities),
    path('add', views.createUniversityWithReview),
    path('', views.display),
]
