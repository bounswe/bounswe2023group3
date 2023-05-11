from django.db import models

# Create your models here.

class Weather(models.Model):
    id = models.AutoField(primary_key=True)
    city = models.CharField(max_length=200)
    countryCode = models.CharField(max_length=10)
    coordinateX = models.DecimalField(max_digits=6, decimal_places=2, null=False, blank=False)
    coordinateY = models.DecimalField(max_digits=6, decimal_places=2, null=False, blank=False)
    temperature = models.DecimalField(max_digits=6, decimal_places=2, null=False, blank=False) # Unit is celcius
    pressure = models.IntegerField(null=False, blank=False) # Unit is km/h
    humidity = models.IntegerField(null=False, blank=False)
