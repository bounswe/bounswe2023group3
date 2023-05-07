from django.urls import path
from . import views

urlpatterns = [
    path('', views.renderBTCPage),
    path('bitcoin-price', views.getBTCPrice)
] 