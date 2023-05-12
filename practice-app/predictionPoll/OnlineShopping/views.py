from django.shortcuts import render
from django.http import JsonResponse
from rest_framework import status
from rest_framework.decorators import api_view
from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema

# Create your views here.
class User:
  username = "" 
  password = ""

currentUser = User

def login(request):
    return render(request, 'login.html')


def home(request):
    if(request.method=="POST"):
        currentUser.username = request.POST["username"]
        currentUser.password = request.POST["password"]
        if(currentUser.username != "" and currentUser.password != ""):
            return render(request, 'home.html', {'username':currentUser.username})
    else:
        return render(request, 'home.html', {'username':currentUser.username})


@swagger_auto_schema(
    method='GET',
    operation_summary='See the password of the user.',
    responses={
        200: 'User password'
    }
)
@swagger_auto_schema(
    method='POST',
    operation_summary='Opening my account/changing password.',
    request_body=openapi.Schema(
        type=openapi.TYPE_OBJECT,
        properties={
            'password': openapi.Schema(type=openapi.TYPE_STRING),
        },
    ),
    responses={
        201: 'Password successfully changed.',
        400: 'Invalid input'
    }
)

@api_view(['GET', 'POST'])
def myAccount(request):
    if(request.method == "POST"):
        currentUser.password = request.POST.get('passw', currentUser.password)
        return render(request, 'myAccount.html', {'username':currentUser.username,'visible':'*****'})
    elif(request.method == "GET"):
        return render(request, 'myAccount.html', {'username':currentUser.username,'visible':currentUser.password})



@swagger_auto_schema(
        method='get',
        operation_summary="Getting the username of the user.",
        responses={
            200: "Username",
            400: "Invalid request"
        }
    )

@api_view(['GET'])
def dataReq(request):
    if(request.method == "GET"):
        data = {
            'username': currentUser.username,
            'password': False,
            'text': 'Need authority to see password.'
        }
        return JsonResponse(data)