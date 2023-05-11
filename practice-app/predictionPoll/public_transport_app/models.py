from django.db import models

# Create your models here.
class Feedback(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    email = models.CharField(max_length=100)
    feedback = models.TextField()
