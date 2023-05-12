from django.test import TestCase
from django.urls import reverse
from OnlineShopping.views import User

class UserUnitTests(TestCase):
    def setUp(self):
        self.user = User(username='serra123',password='12345')
    
    def loginTEST(self):
        response = self.client.get(reverse('login'))
        self.assertEqual(response.status_code, 200)
    
    def homeTEST(self):
        response = self.user.get(reverse('home'))
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.context['username'], 'serra123')
    
    def myAccount_getTEST(self):
        response = self.user.get(reverse('myAccount'))
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.context['username'], 'serra123')
        self.assertEqual(response.context['visible'], '12345')
    
    def myAccount_postTEST(self):
        response = self.user.get(reverse('myAccount'))
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.context['username'], 'serra123')
        self.assertEqual(response.context['visible'], '*****')
    
    def test_dataReq_getTEST(self):
        response = self.user.get(reverse('dataReq'))
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json(), {'username': 'serra123', 'password': False, 'text': 'Need authority to see password.'})

