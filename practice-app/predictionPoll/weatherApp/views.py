import json  
from django.shortcuts import render  
import urllib.request  
import json  
from django.http import JsonResponse
from .models import Weather
  
# Create your views here.  
  
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

def getIstanbulWeather(req):
    source = urllib.request.urlopen('http://api.openweathermap.org/data/2.5/weather?q=istanbul&units=imperial&appid=164fec96a27b97680ee442e489ce3f06').read()
    data = json.loads(source)
    return JsonResponse({
        'weather': data
    })

def getAllSearchedWeathers(req):
    return JsonResponse({
        'weathers': list(Weather.objects.values())
    })