from django.urls import path
from . import views

urlpatterns = [
    path('listall', views.getUniversitiesInTurkey, name="universitiesInTurkey"),
    path('list', views.listUniversities, name="listing"),
    path('add', views.createUniversityWithReview, name="create"),
    path('', views.display),
]
