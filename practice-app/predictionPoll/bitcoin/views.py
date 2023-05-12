import requests

from django.http import JsonResponse
from django.shortcuts import render

from .forms import OrderForm
from .models import MockOrder

# Create your views here.
def renderBTCPage(req):
    form = OrderForm()
    if req.method == "POST":
        form = OrderForm(req.POST) #if no files
        if form.is_valid():
            #do something if form is valid
            o = MockOrder(
                symbol='BTCUSDT',
                price=form.cleaned_data['price'],
                quantity=form.cleaned_data['quantity'],
                side=form.cleaned_data['side'],
                type=form.cleaned_data['type']
            )
            o.save()
    context = {
        'form': form
    }
    return render(req, "bitcoin.html", context)

def getBTCPrice(req):
    response = requests.get('https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT')
    price_info = response.json()
    return JsonResponse(price_info)

def getAllOrders(req):
    return JsonResponse({
        'orders': list(MockOrder.objects.values())
    })