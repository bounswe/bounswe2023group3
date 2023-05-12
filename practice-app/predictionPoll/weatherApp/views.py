import json  
from django.shortcuts import render  
import urllib.request  
import json  
from django.http import JsonResponse
from rest_framework.decorators import api_view
from .models import Weather
from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema
  
# Create your views here.  


@swagger_auto_schema(
    method='GET',
    operation_summary='Fetch web application',
    responses={
        200: 'Html code of the application'
    }
)
@swagger_auto_schema(
    method='POST',
    operation_summary='Create a new weather state and save it to the database',
    request_body=openapi.Schema(
        type=openapi.TYPE_OBJECT,
        properties={
            'city': openapi.Schema(type=openapi.TYPE_STRING),
            'countryCode': openapi.Schema(type=openapi.TYPE_STRING),
            'coordinateX': openapi.Schema(type=openapi.TYPE_NUMBER),
            'coordinateY': openapi.Schema(type=openapi.TYPE_NUMBER),
            'temperature': openapi.Schema(type=openapi.TYPE_NUMBER),
            'pressure': openapi.Schema(type=openapi.TYPE_INTEGER),
            'humidity': openapi.Schema(type=openapi.TYPE_INTEGER),
        },
        required=['name', 'email', 'feedback']
    ),
    responses={
        201: 'Searched weather successfully created and saved in the database',
        400: 'Invalid input'
    }
)

@api_view(['GET', 'POST']) 

def renderWeatherApp(request):  
    if request.method == 'POST':  
        # Get the city name from the user api = http://api.openweathermap.org/data/2.5/weather  
        city = request.POST.get('city', 'True')  
          
        # retreive the information using api  
        source = urllib.request.urlopen('http://api.openweathermap.org/data/2.5/weather?q=' + city + '&units=imperial&appid=164fec96a27b97680ee442e489ce3f06').read()  
          
        # convert json data file into python dictionary  
        list_of_data = json.loads(source)  
  
        model = Weather(
                #id ='BTCUSDT',
                city = city,
                countryCode = str(list_of_data['sys']['country']),
                coordinateX = str(list_of_data['coord']['lon']),
                coordinateY = str(list_of_data['coord']['lat']),
                temperature = str(list_of_data['main']['temp']),
                pressure    = str(list_of_data['main']['pressure']),
                humidity   = str(list_of_data['main']['humidity'])
            )
        
        model.save()

        # create dictionary and convert value in string  
        context = {  
            "city": city,  
            "country_code": str(list_of_data['sys']['country']),  
            "coordinate": str(list_of_data['coord']['lon']) + ' '  
                            + str(list_of_data['coord']['lat']),  
            "temp": str(list_of_data['main']['temp']) + 'k',  
            "pressure": str(list_of_data['main']['pressure']),  
            "humidity": str(list_of_data['main']['humidity']),  
        }  
    else:  
        context = {}  
      
    # send dictionary to the index.html  
    return render(request, 'weather.html', context) 

@swagger_auto_schema(
        method='get',
        operation_summary="Get the current weather state of Istanbul via an external Api",
        responses={
            200: "Weather State of Istanbul",
            400: "Invalid request"
        }
    )

@api_view(['GET'])

def getIstanbulWeather(req):
    source = urllib.request.urlopen('http://api.openweathermap.org/data/2.5/weather?q=istanbul&units=imperial&appid=164fec96a27b97680ee442e489ce3f06').read()
    data = json.loads(source)
    return JsonResponse({
        'weather': data
    })

@swagger_auto_schema(
        method='get',
        operation_summary="Get all searched weather states from database",
        responses={
            200: "Weather State of All Searched Cities in the Website",
            400: "Invalid request"
        }
    )

@api_view(['GET'])

def getAllSearchedWeathers(req):
    return JsonResponse({
        'weathers': list(Weather.objects.values())
    })