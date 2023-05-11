from django.urls import path
from . import views

urlpatterns = [
    path(route="check-comment-validity/",view=views.moderate_comment),
    path(route="list-comment-history/",view=views.comment_history)
]