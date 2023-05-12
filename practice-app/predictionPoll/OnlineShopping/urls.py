from django.urls import path
from . import views

urlpatterns = [
    path('login/', views.login),
    path('home/', views.home),
    path('myAccount/', views.myAccount),
    path('dataReq/', views.dataReq),

]