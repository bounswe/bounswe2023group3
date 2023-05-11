from django.shortcuts import render
from django.http import JsonResponse

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

def myAccount(request):
    if(request.method == "POST"):
        currentUser.password = request.POST.get('passw', currentUser.password)
        return render(request, 'myAccount.html', {'username':currentUser.username,'visible':'*****'})
    elif(request.method == "GET"):
        return render(request, 'myAccount.html', {'username':currentUser.username,'visible':currentUser.password})


def dataReq(request):
    if(request.method == "GET"):
        data = {
            'username': currentUser.password,
            'password': False,
            'text': 'Need authority to see password.'
        }
        return JsonResponse(data)