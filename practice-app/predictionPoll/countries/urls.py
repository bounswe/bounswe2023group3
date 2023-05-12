from django.urls import path
from . import views

app_name = 'countries'

urlpatterns = [
    path('', views.country_view, name='country_view'),
    path('recent/', views.recent_countries, name='recent_countries'),
]
