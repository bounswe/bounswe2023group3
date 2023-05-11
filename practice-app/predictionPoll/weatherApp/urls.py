from django.urls import path
from . import views

urlpatterns = [
    path('', views.renderWeatherApp),
    path('istanbul/', views.getIstanbulWeather),
    path('all-weathers/', views.getAllSearchedWeathers)
]