from django.db import models
from django.utils.translation import gettext_lazy as _

# Create your models here.
class MockOrder(models.Model):

    class Side(models.TextChoices):
        buy = 'buy'
        sell = 'sell'

    class Type(models.TextChoices):
        market = 'market'
        limit = 'limit'

    symbol = models.CharField(max_length=10, null=False, blank=False)
    price = models.DecimalField(max_digits=10, decimal_places=2, null=False, blank=False)
    quantity = models.DecimalField(max_digits=10, decimal_places=2, null=False, blank=False)
    side = models.CharField(max_length=4, choices=Side.choices, null=False, blank=False, default=Side.buy)
    type = models.CharField(max_length=4, choices=Side.choices, null=False, blank=False, default=Type.market)
    time = models.DateTimeField(auto_now_add=True)