from django.urls import path
from . import views

urlpatterns = [
    path('forecast/', views.forecast, name='forecast'),
    path('air_quality/', views.air_quality, name='air_quality'),
    path('', views.weather, name='weather')
]
