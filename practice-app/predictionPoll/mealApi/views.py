from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from rest_framework import status
from rest_framework.decorators import api_view
from .models import Review
from .serializers import ReviewSerializer
import requests
import json

# Create your views here.

def display(request):
    return render(request, 'page.html')

@api_view(['GET', 'POST'])
def reviews(request):
    if request.method == 'GET':
        reviews = Review.objects.all()
        serializer = ReviewSerializer(reviews, many=True)
        return JsonResponse(serializer.data, safe=False)
    elif request.method == 'POST':
        data = request.data
        serializer = ReviewSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse({"message": "Review is successfully saved"}, status=status.HTTP_201_CREATED, safe=False)
        return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['GET'])
def getRandomMeal(request):
    response = requests.get('https://www.themealdb.com/api/json/v1/1/random.php')
    meals = response.json()["meals"][0]
    meals_json = json.dumps(meals)
    return HttpResponse(meals_json, content_type='application/json', status=status.HTTP_200_OK)