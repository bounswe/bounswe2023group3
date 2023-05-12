from django.urls import path
from . import views

urlpatterns = [
    path('getRandomMeal/', views.getRandomMeal),
    path('reviews/', views.reviews),
    path('', views.display)
]