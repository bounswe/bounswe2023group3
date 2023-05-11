from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from rest_framework import status
from rest_framework.decorators import api_view
from .models import Feedback
from .serializers import FeedbackSerializer
import requests
import json

# Create your views here.

def display(request):
    return render(request, 'temp.html')

@api_view(['GET', 'POST'])
def feedback_list(request):
    if request.method == 'GET':
        feedbacks = Feedback.objects.all()
        serializer = FeedbackSerializer(feedbacks, many=True)
        return JsonResponse(serializer.data, safe=False)
    elif request.method == 'POST':
        data = request.data
        serializer = FeedbackSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse({"message": "Succesfully Saved The Feedback"}, status=status.HTTP_201_CREATED, safe=False)
        return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def get_ticket_prices(request):
    ret_dict = {}
    ret_arr = []
    response = requests.get('https://api.ibb.gov.tr/MetroIstanbul/api/MetroMobile/V2/GetTicketPrice/EN')
    for i in response.json()["Data"]:
        for j in i["TicketPrices"]:
            temp_dict = {}
            temp_dict["card_name"] = i["Type"]
            temp_dict["type"] = j["Name"]
            temp_dict["price"] = j["Price"]
            ret_arr.append(temp_dict)
    return HttpResponse(json.dumps(ret_arr, ensure_ascii=False), status=status.HTTP_200_OK)