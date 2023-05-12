from django.core.validators import MaxValueValidator, MinValueValidator
from django.db import models


# Create your models here.


class University(models.Model):
    id = models.BigAutoField(primary_key=True)
    name = models.CharField(max_length=50, unique=True)
    web_page = models.CharField(max_length=150, unique=True)
    ranking = models.FloatField(null=True, validators=[MaxValueValidator(5), MinValueValidator(1)])


class Review(models.Model):
    id = models.BigAutoField(primary_key=True)
    comment = models.TextField()
    university = models.ForeignKey(University, on_delete=models.CASCADE)
