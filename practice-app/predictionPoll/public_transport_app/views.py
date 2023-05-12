from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from rest_framework import status
from rest_framework.decorators import api_view
from .models import Feedback
from .serializers import FeedbackSerializer
import requests
import json
from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema

# Create your views here.

def display(request):
    return render(request, 'temp.html')



@swagger_auto_schema(
    method='GET',
    operation_summary='Get the feedbacks entered by the users',
    responses={
        200: 'A list of the feedbacks in JSON format'
    }
)
@swagger_auto_schema(
    method='POST',
    operation_summary='Create a new feedback and save it to the database',
    request_body=openapi.Schema(
        type=openapi.TYPE_OBJECT,
        properties={
            'name': openapi.Schema(type=openapi.TYPE_STRING),
            'email': openapi.Schema(type=openapi.TYPE_STRING),
            'feedback': openapi.Schema(type=openapi.TYPE_STRING)
        },
        required=['name', 'email', 'feedback']
    ),
    responses={
        201: 'Feedback successfully created and saved',
        400: 'Invalid input'
    }
)
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

@swagger_auto_schema(
        method='get',
        operation_summary="Get the ticket prices for various type of cards from the municipality",
        responses={
            200: "Ticket prices",
            400: "Invalid request"
        }
    )
@api_view(['GET'])
def get_ticket_prices(request):
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