from django.db import models

class Country(models.Model):
    name = models.CharField(max_length=100)
    capital = models.CharField(max_length=100)
    population = models.IntegerField(blank=True, null=True)

    def __str__(self):
        return self.name