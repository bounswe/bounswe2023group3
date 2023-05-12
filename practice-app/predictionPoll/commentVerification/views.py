from django.shortcuts import render,redirect
from .forms import CommentCheckForm
from os import getenv
import json
import requests
from .models import ValidationState,CommentValidationHistory
from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema
from rest_framework.decorators import api_view


def display(request):
    return render(request,"commentVerification/temp.html")



@swagger_auto_schema(
    method='GET',
    operation_summary='Get the empty form to submit a comment',
    responses={
        200: 'an html response containing a form'
    }
)
@swagger_auto_schema(
    method='POST',
    operation_summary='post a comment to be evaluated/moderated using external api',
    request_body=openapi.Schema(
        type=openapi.TYPE_OBJECT,
        properties={
            'data': openapi.Schema(
                type=openapi.TYPE_OBJECT,
                properties={
                    'comment':openapi.Schema(type=openapi.TYPE_STRING,description='comment to be evaluated')
                },
                required=['comment']
            )
        },
        required=['data']
    ),
    responses={
        201: 'comment is checked and saved to the history',
        400: 'Invalid input'
    }
)
@api_view(['GET', 'POST'])
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
            
            url = "https://commentanalyzer.googleapis.com/v1alpha1/comments:analyze"
            querystring = {"key": api_key}

            payload = {
                "comment": {"text": text},
                "requestedAttributes": {"TOXICITY": {}}
            }

            headers = {'Content-Type': 'application/json'}

            response = requests.post(url, params=querystring, headers=headers, data=json.dumps(payload))
            result = response.json()
            

            validation_state = None
            toxicity_level = None
            if "error" in result and result['error']['code']==400 and result['error']['status'] == 'INVALID_ARGUMENT':
                validation_state = ValidationState.COULD_NOT_VALIDATE
                result = "comment cannot be analyzed"
            else:
                toxicity_level = result["attributeScores"]["TOXICITY"]["summaryScore"]["value"]
                rejected=toxicity_level > .7
                result= "we cannot publish your comment" if rejected else "comment is publishable"
                result +=" according to our community rules. toxicity level: "+ str(toxicity_level)
                validation_state= ValidationState.REJECTED if rejected else ValidationState.ACCEPTED
            
            CommentValidationHistory.objects.create(comment_body=text, validation_state=validation_state, toxicity_level =toxicity_level)

        form = CommentCheckForm()

    # the "form" object will be translated into html using django's renderer.
    # by passing it into our template's "form" variable
    return render(request, "commentVerification/comment_form.html", {"form": form, "result": result})



@swagger_auto_schema(
        method='get',
        operation_summary="return comment history",
        responses={
            200: "html response containing comments and their evaluations states (accepted, rejected, couldnt_evaluated).",
            400: "Invalid request"
        }
    )
@api_view(['GET'])
def comment_history(request):
    history = CommentValidationHistory.objects.all()
    return render(request, 'commentVerification/comment_history.html', {'history': history})
