from django.shortcuts import render
from rest_framework.decorators import api_view
from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema
import requests
import datetime

API_key = "77bf70dde16f9f35d3d9d8702fd32096"
weather_url = "https://api.openweathermap.org/data/2.5/weather?q={}&appid={}"
forecast_url = "https://api.openweathermap.org/data/2.5/forecast?lat={}&lon={}&appid={}"
air_url = "http://api.openweathermap.org/data/2.5/air_pollution?lat={}&lon={}&appid={}"

@swagger_auto_schema(
    method='GET',
    operation_summary='Show the main page',
    responses={
        200: 'Success'
    }
)

@api_view(['GET'])
def weather(request):
    if request.method == "GET":
        return render(request, "weather_app/weather.html")

@swagger_auto_schema(
    methods=['POST'],
    operation_summary='',
    request_body=openapi.Schema(
        type=openapi.TYPE_OBJECT,
        properties={
            'city': openapi.Schema(type=openapi.TYPE_STRING)
        },
        required=['city']
    ),
    responses={
        200: openapi.Schema(
            type=openapi.TYPE_OBJECT,
            properties={
                'weather_data': openapi.Schema(
                    type=openapi.TYPE_OBJECT,
                    properties={
                        'city': openapi.Schema(type=openapi.TYPE_STRING),
                        'temperature': openapi.Schema(type=openapi.TYPE_NUMBER),
                        'description': openapi.Schema(type=openapi.TYPE_STRING),
                        'icon': openapi.Schema(type=openapi.TYPE_STRING),
                    }
                ),
                'forecast_data': openapi.Schema(
                    type=openapi.TYPE_ARRAY,
                    items=openapi.Schema(
                        type=openapi.TYPE_OBJECT,
                        properties={
                            'day': openapi.Schema(type=openapi.TYPE_STRING),
                            'min_temperature': openapi.Schema(type=openapi.TYPE_NUMBER),
                            'max_temperature': openapi.Schema(type=openapi.TYPE_NUMBER),
                            'description': openapi.Schema(type=openapi.TYPE_STRING),
                            'icon': openapi.Schema(type=openapi.TYPE_STRING),
                        }
                    )
                )
            }
        )
    }
)

@api_view(['GET', 'POST'])
def forecast(request):
    if request.method == "POST":
        city = request.POST.get('city', None)

        if city != None and city != '':
            weather_data, forecast_data = fetch_weather_data(city, API_key, weather_url, forecast_url)
        else:
            return render(request, "weather_app/forecast.html")
        return render(request, "weather_app/forecast.html", {"weather_data" : weather_data, "forecast_data" : forecast_data})
        

    elif request.method == "GET":
        return render(request, "weather_app/forecast.html")
    
def fetch_weather_data(city, API_key, weather_url, forecast_url):
    response = requests.get(weather_url.format(city, API_key)).json()

    if response['cod'] == '404': #if city name is not valid
        return None, None
    
    lat, lon = response['coord']['lat'], response['coord']['lon']
    all_response = requests.get(forecast_url.format(lat, lon, API_key)).json()

    weather_data = {
        "city" : city,
        "temperature" : round(response['main']['temp'] - 273.15, 1),
        "description" : response['weather'][0]['description'],
        "icon" : response['weather'][0]['icon']
    }

    forecast_data = [] 
    
    for data in all_response['list'][:40:8]:
        forecast_data.append(
            {
                "day" : datetime.datetime.fromtimestamp(data['dt']).strftime("%A"),
                "min_temperature" : round(data['main']['temp_min'] - 273.15, 1),
                "max_temperature" : round(data['main']['temp_max'] - 273.15, 1),
                "description" : data['weather'][0]['description'],
                "icon" : data['weather'][0]['icon']
            }
        )

    return weather_data, forecast_data

@swagger_auto_schema(
    methods=['POST'],
    operation_summary='',
    request_body=openapi.Schema(
        type=openapi.TYPE_OBJECT,
        properties={
            'city': openapi.Schema(type=openapi.TYPE_STRING)
        },
        required=['city']
    ),
    responses={
        200: openapi.Schema(
            type=openapi.TYPE_OBJECT,
            properties={
                'weather_data': openapi.Schema(
                    type=openapi.TYPE_OBJECT,
                    properties={
                        'city': openapi.Schema(type=openapi.TYPE_STRING)
                    }
                ),
                'air_quality_data': openapi.Schema(
                    type=openapi.TYPE_ARRAY,
                    items=openapi.Schema(
                        type=openapi.TYPE_OBJECT,
                        properties={
                            'day': openapi.Schema(type=openapi.TYPE_STRING),
                            'index': openapi.Schema(type=openapi.TYPE_STRING),
                            'CO': openapi.Schema(type=openapi.TYPE_NUMBER),
                            'NO': openapi.Schema(type=openapi.TYPE_NUMBER),
                            'NO2': openapi.Schema(type=openapi.TYPE_NUMBER),
                            'O3': openapi.Schema(type=openapi.TYPE_NUMBER),
                            'SO2': openapi.Schema(type=openapi.TYPE_NUMBER),
                        }
                    )
                )
            }
        )
    }
)

@api_view(['GET', 'POST'])
def air_quality(request):

    if request.method == "POST":
        city = request.POST.get('city', None)
        if city != None and city != '':
            weather_data, air_quality_data = fetch_air_quality_data(city, API_key, weather_url, air_url)
        else:
            return render(request, "weather_app/air_quality.html")
        return render(request, "weather_app/air_quality.html", {"weather_data" : weather_data, "air_quality_data" : air_quality_data})

    elif request.method == "GET":
        return render(request, "weather_app/air_quality.html")
    

def fetch_air_quality_data(city, API_key, weather_url, air_url):
    response = requests.get(weather_url.format(city, API_key)).json()

    if response['cod'] == '404': #if city name is not valid
        return None, None
    
    lat, lon = response['coord']['lat'], response['coord']['lon']
    air_response = requests.get(air_url.format(lat, lon, API_key)).json()

    weather_data = {"city" : city}

    air_quality_data = [] 
    air_index_data = ['Good', 'Fair', 'Moderate', 'Poor', 'Very Poor'] 
    
    for data in air_response['list'][:40:8]:
        air_quality_data.append(
            {
                "day" : datetime.datetime.fromtimestamp(data['dt']).strftime("%A"),
                "index" : air_index_data[int(data['main']['aqi'])-1],
                "CO" : data['components']['co'],
                "NO" : data['components']['no'],
                "NO2" : data['components']['no2'],
                "O3" : data['components']['o3'],
                "SO2" : data['components']['so2']
            }
        )

    return weather_data, air_quality_data



