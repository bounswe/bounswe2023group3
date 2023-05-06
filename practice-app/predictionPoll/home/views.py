from django.shortcuts import render


# Create your views here.

def renderHomePage(req):
    return render(req, 'index.html')

