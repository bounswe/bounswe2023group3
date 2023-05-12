"""
URL configuration for predictionPoll project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

schema_view = get_schema_view(
   openapi.Info(
      title="Practice app",
      default_version='v1',
      description="This is practice app of Cmpe352 group 3 of 2023.",
   ),
   public=True,
   permission_classes=[permissions.AllowAny],
)


urlpatterns = [
    path('admin/', admin.site.urls),
    path('universities/', include('universities.urls')),
    path('', include('home.urls')),
    path('weather/', include('weather_app.urls')),
    path('transportation/', include('public_transport_app.urls')),
    path('OnlineShopping/', include('OnlineShopping.urls')),
    path('bitcoin/', include('bitcoin.urls')),
    path('meal/', include('mealApi.urls')),
    path('weather-app/', include('weatherApp.urls')),
    path('transportation/', include('public_transport_app.urls')),
    path('commentVerification/', include('commentVerification.urls')),
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
]
