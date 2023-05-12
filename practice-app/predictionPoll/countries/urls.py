from django.urls import path
from . import views

urlpatterns = [
    path('', views.home),  
    path('search/', views.search_country),  
    path('add_to_favorites/', views.add_to_favorites),
    path('remove_from_favorites/', views.remove_from_favorites),
    path('list_favorites/', views.list_favorites),
]