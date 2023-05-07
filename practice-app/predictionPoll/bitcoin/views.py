import requests
from json import loads

from django.http import JsonResponse
from django.shortcuts import render

# Create your views here.
def renderBTCPage(req):
    return render(req, 'bitcoin.html')

def getBTCPrice(req):
    response = requests.get('https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT')
    price_info = response.json()
    return JsonResponse(price_info)