from django.urls import path
from . import views

urlpatterns = [
    path('feedbacks/', views.feedback_list),
    path('ticket-prices/', views.get_ticket_prices),
    path('display/', views.display)
]