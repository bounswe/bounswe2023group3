from django.shortcuts import render,redirect
from .forms import CommentCheckForm
from os import getenv
from perspective import PerspectiveAPI
from urllib.error import HTTPError
from .models import ValidationState,CommentValidationHistory


def display(request):
    return render(request,"temp.html")

def moderate_comment(request):
    result = None
    if request.method == "GET":
        # if the request type is GET
        # (when a visitor requests the form to fill)
        # an empty form is returned.
        form = CommentCheckForm()
        # as we defined the CommentCheckForm class,
        # it has a text field with name "comment".
         
    elif request.method == "POST":
        # if request type sent to the url of this view is "POST"
        # which happens after submitting a form
        # filled form is returned again. 
        # to be rendered together with the result.

        form = CommentCheckForm(request.POST)

        if form.is_valid():
            text = form.cleaned_data["comment"]
            api_key= getenv("PERSPECTIVE_API_KEY")
            perspective_connect=PerspectiveAPI(api_key=api_key)
            try:
                result= perspective_connect.score(text)
            except HTTPError as e:
                result=None
            validation_state = None
            toxicity_level = None
            if result:
                toxicity_level = result["TOXICITY"] 
                rejected=toxicity_level > .7
                result= "we cannot publish your comment" if rejected else "comment is publishable"
                result +=" according to our community rules. toxicity level: "+ str(toxicity_level)
                validation_state= ValidationState.REJECTED if rejected else ValidationState.ACCEPTED

            elif result==None:
                result= "comment cannot be analyzed"
                validation_state = ValidationState.COULD_NOT_VALIDATE
            CommentValidationHistory.objects.create(comment_body=text, validation_state=validation_state, toxicity_level =toxicity_level)

        form = CommentCheckForm()

    # the "form" object will be translated into html using django's renderer.
    # by passing it into our template's "form" variable
    return render(request, "commentVerification/comment_form.html", {"form": form, "result": result})


def comment_history(request):
    history = CommentValidationHistory.objects.all()
    return render(request, 'commentVerification/comment_history.html', {'history': history})
