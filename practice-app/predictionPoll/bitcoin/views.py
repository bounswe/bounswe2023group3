import requests

from django.http import JsonResponse
from django.shortcuts import render
from rest_framework.decorators import api_view
from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema

from .forms import OrderForm
from .models import MockOrder

@swagger_auto_schema(
    method='POST',
    operation_summary='Create a new order and save it to the database',
    request_body=openapi.Schema(
        type=openapi.TYPE_OBJECT,
        properties={
            'symbol': openapi.Schema(type=openapi.TYPE_STRING),
            'price': openapi.Schema(type=openapi.TYPE_NUMBER),
            'quantity': openapi.Schema(type=openapi.TYPE_NUMBER),
            'side': openapi.Schema(type=openapi.TYPE_STRING),
            'type': openapi.Schema(type=openapi.TYPE_STRING)
        },
        required=['symbol', 'price', 'quantity', 'side', 'type']
    ),
)
@api_view(['GET','POST'])
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

@swagger_auto_schema(
    method='GET',
    operation_summary='Get all orders created',
    responses={
        200: 'All MockOrder objects in the database in JSON format',
    }
)
@api_view(['GET'])
def getBTCPrice(req):
    response = requests.get('https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT')
    price_info = response.json()
    return JsonResponse(price_info)

@swagger_auto_schema(
    method='GET',
    operation_summary='Get current Bitcoin price from Binance',
    responses={
        200: 'Bitcoin price in JSON format'
    }
)
@api_view(['GET'])
def getAllOrders(req):
    return JsonResponse({
        'orders': list(MockOrder.objects.values())
    })