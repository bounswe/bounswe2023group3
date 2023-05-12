from django.db import models

# Create your models here.

class Review(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    meal = models.CharField(max_length=100)
    review = models.TextField()