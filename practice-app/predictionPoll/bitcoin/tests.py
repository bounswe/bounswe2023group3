from django.test import TestCase
from .models import MockOrder
# Create your tests here.

class MockOrderTestCase(TestCase):
    def setUp(self):
        MockOrder.objects.create(symbol='BTCUSD', price=24500, quantity=0.1, side='buy', type='limit')
        MockOrder.objects.create(symbol='BTCUSD', price=23500, quantity=0.2, side='sell', type='market')
        

    def test_get_orders(self):
        """Can get orders from database"""
        orders = MockOrder.objects.values()

        self.assertEquals(len(orders), 2, "Should be 2 orders in database")
        self.assertEquals(orders[0]['symbol'], 'BTCUSD', "First order should be BTCUSD")
        self.assertEquals(orders[1]['symbol'], 'BTCUSD', "Second order should be BTCUSD")
        self.assertEquals(orders[0]['price'], '24500.00', "First order price should be 24500.00")
        self.assertEquals(orders[1]['price'], '23500.00', "Second order price should be 23500.00")
        self.assertEquals(orders[0]['quantity'], '0.10', "First order quantity should be 0.10")
        self.assertEquals(orders[1]['quantity'], '0.20', "Second order quantity should be 0.20")
        self.assertEquals(orders[0]['side'], 'buy', "First order side should be buy")
        self.assertEquals(orders[1]['side'], 'sell', "Second order side should be sell")
        self.assertEquals(orders[0]['type'], 'limit', "First order type should be limit")
        self.assertEquals(orders[1]['type'], 'market', "Second order type should be market")

