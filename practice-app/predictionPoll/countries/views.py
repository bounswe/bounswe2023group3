from django.http import JsonResponse
from django.shortcuts import render

from .models import FavoriteCountry
from .services import get_country_info

def search_country(request):
    country_name = request.GET.get('country_name', '')
    data = get_country_info(country_name)
    return JsonResponse(data, safe=False)

def add_to_favorites(request):
    country_name = request.GET.get('country_name', '')
    FavoriteCountry.objects.create(country_name=country_name)
    return JsonResponse({'message': 'Added to favorites'})

def remove_from_favorites(request):
    country_name = request.GET.get('country_name', '')
    FavoriteCountry.objects.filter(country_name=country_name).delete()
    return JsonResponse({'message': 'Removed from favorites'})

def list_favorites(request):
    favorites = FavoriteCountry.objects.all().values('country_name')
    return JsonResponse({'favorites': list(favorites)})


def home(request):
    return render(request, 'appear.html')