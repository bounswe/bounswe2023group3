from django.urls import path
from . import views

urlpatterns = [
    path(route="check-comment-validity/",view=views.moderate_comment,name="moderate_comment"),
    path(route="list-comment-history/",view=views.comment_history,name="comment_history"),
    path(route="",view=views.display)
]
