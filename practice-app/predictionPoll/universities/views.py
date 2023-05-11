import json
from django.http import JsonResponse, HttpResponse
from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import render
from .models import Review, University
import requests
from .forms import CreateUniversityWithReviewForm


# Create your views here.
def display(request):
    return render(request, 'temp.html')


def getUniversitiesInTurkey(request):
    response = requests.get("http://universities.hipolabs.com/search?country=Turkey")
    return JsonResponse(json.loads(response.content), safe=False)


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

        return JsonResponse({"name": university.name, "web-page": university.web_page, "review": review.comment})
    else:
        return HttpResponse(status=405)


def listUniversities(request):
    universities = University.objects.all()
    context = []
    for university in universities:
        reviews = Review.objects.filter(university_id=university.id)
        review_list = []
        for review in reviews:
            review_list.append({"comment": review.comment})
        context.append({"name": university.name, "web-page": university.web_page,
                        "reviews": review_list})
    return JsonResponse(context, safe=False)
