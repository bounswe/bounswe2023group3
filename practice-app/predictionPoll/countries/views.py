from django.http import JsonResponse
from django.shortcuts import render
from rest_framework.decorators import api_view

from .models import FavoriteCountry
from .services import get_country_info

from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema



@swagger_auto_schema(
    method='GET',
    operation_summary='Get the country with the given parameter',
    responses={
        200: 'Fetch the country'
    }
)

@api_view(['GET'])
def search_country(request):
    country_name = request.GET.get('country_name', '')
    data = get_country_info(country_name)
    return JsonResponse(data, safe=False)

@swagger_auto_schema(
    method='GET',
    operation_summary='Get the country with the given parameter',
    responses={
        200: 'Fetch the country'
    }
)
@swagger_auto_schema(
    method='POST',
    operation_summary='Add country to the favorites',
    request_body=openapi.Schema(
        type=openapi.TYPE_OBJECT,
        properties={
            'country_name': openapi.Schema(type=openapi.TYPE_STRING),
        },
        required=['name', 'email', 'feedback']
    ),
    responses={
        201: 'Country successfully saved as favorite',
        400: 'Invalid input'
    }
)


@api_view(['GET', 'POST'])
def add_to_favorites(request):
    country_name = request.GET.get('country_name', '')
    FavoriteCountry.objects.create(country_name=country_name)
    return JsonResponse({'message': 'Added to favorites'})


@swagger_auto_schema(
    method='GET',
    operation_summary='Get the country with the given parameter',
    responses={
        200: 'Fetch the country'
    }
)
@swagger_auto_schema(
    method='POST',
    operation_summary='Delete country from favorites with the given parameter',
    request_body=openapi.Schema(
        type=openapi.TYPE_OBJECT,
        properties={
            'country_name': openapi.Schema(type=openapi.TYPE_STRING),
        },
        required=['name', 'email', 'feedback']
    ),
    responses={
        201: 'Delete country from favorites',
        400: 'Invalid input'
    }
)
@api_view(['GET', 'POST'])
def remove_from_favorites(request):
    country_name = request.GET.get('country_name', '')
    FavoriteCountry.objects.filter(country_name=country_name).delete()
    return JsonResponse({'message': 'Removed from favorites'})

@swagger_auto_schema(
        method='get',
        operation_summary="Get the favorite countries from database",
        responses={
            200: "List favorite countries",
            400: "Invalid request"
        }
    )

@api_view(['GET'])
def list_favorites(request):
    favorites = FavoriteCountry.objects.all().values('country_name')
    return JsonResponse({'favorites': list(favorites)})

@swagger_auto_schema(
        method='get',
        operation_summary="Get the html for the web page",
        responses={
            200: "Render html",
            400: "Invalid request"
        }
    )

@api_view(['GET'])
def home(request):
    return render(request, 'appear.html')