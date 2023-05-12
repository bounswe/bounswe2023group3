from django.db import models

class FavoriteCountry(models.Model):
    country_name = models.CharField(max_length=200, unique=True)