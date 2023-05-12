import json
from django.http import JsonResponse, HttpResponse
from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import render
from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema
from rest_framework.decorators import api_view

from .models import Review, University
import requests
from .forms import CreateUniversityWithReviewForm


# Create your views here.
def display(request):
    return render(request, 'temp.html')


@swagger_auto_schema(
    method='GET',
    operation_summary='Get the all universities from an external api',
    responses={
        200: 'A list of the universities in JSON format'
    }
)
@api_view(['GET'])
def getUniversitiesInTurkey(request):
    response = requests.get("http://universities.hipolabs.com/search?country=Turkey")
    return JsonResponse(json.loads(response.content), safe=False)


@swagger_auto_schema(
    method='POST',
    operation_summary='Create a new university and add a review',
    request_body=openapi.Schema(
        type=openapi.TYPE_OBJECT,
        properties={
            'name': openapi.Schema(type=openapi.TYPE_STRING),
            'web_page': openapi.Schema(type=openapi.TYPE_STRING),
            'review': openapi.Schema(type=openapi.TYPE_STRING)
        },
        required=['name', 'email', 'feedback']
    ),
    responses={
        200: openapi.Schema(
            type=openapi.TYPE_OBJECT,
            properties={
                'name': openapi.Schema(type=openapi.TYPE_STRING),
                'web_page': openapi.Schema(type=openapi.TYPE_STRING),
                'review': openapi.Schema(type=openapi.TYPE_STRING)
            }),
        400: 'Invalid input'
    }
)
@api_view(['POST'])
@csrf_exempt
def createUniversityWithReview(request):
    if request.method == "POST":
        request_body = json.loads(request.body)
        university_form = CreateUniversityWithReviewForm(data=request_body)
        if not university_form.is_valid() or not request_body.get("review"):
            return JsonResponse(dict(university_form.errors.items()), status=400)

        university = university_form.save()
        review = Review(comment=request_body["review"], university=university)
        review.save()

        return JsonResponse({"name": university.name, "web_page": university.web_page, "review": review.comment})
    else:
        return HttpResponse(status=405)


@swagger_auto_schema(
    method='GET',
    operation_summary='Get the all universities in the DB',
    responses={
        200: 'A list of the universities in JSON format'
    }
)
@api_view(['GET'])
def listUniversities(request):
    universities = University.objects.all()
    context = []
    for university in universities:
        reviews = Review.objects.filter(university_id=university.id)
        review_list = []
        for review in reviews:
            review_list.append({"comment": review.comment})
        context.append({"name": university.name, "web_page": university.web_page,
                        "reviews": review_list})
    return JsonResponse(context, safe=False)
