from django.test import TestCase, Client
from django.urls import reverse
from .models import FavoriteCountry
from .services import get_country_info

class TestViews(TestCase):

    def setUp(self):
        self.client = Client()
        self.search_url = reverse('search_country')
        self.add_to_favorites_url = reverse('add_to_favorites')
        self.remove_from_favorites_url = reverse('remove_from_favorites')
        self.list_favorites_url = reverse('list_favorites')

    def test_search_country_GET(self):
        response = self.client.get(self.search_url, {'country_name': 'Turkey'})

        self.assertEquals(response.status_code, 200)
        self.assertJSONEqual(
            str(response.content, encoding='utf8'),
            get_country_info('Turkey')
        )

    def test_add_to_favorites_POST(self):
        response = self.client.post(self.add_to_favorites_url, {'country_name': 'Turkey'})

        self.assertEquals(response.status_code, 200)
        self.assertEquals(FavoriteCountry.objects.count(), 1)

    def test_remove_from_favorites_POST(self):
        self.client.post(self.add_to_favorites_url, {'country_name': 'Turkey'})
        response = self.client.post(self.remove_from_favorites_url, {'country_name': 'Turkey'})

        self.assertEquals(response.status_code, 200)
        self.assertEquals(FavoriteCountry.objects.count(), 0)
