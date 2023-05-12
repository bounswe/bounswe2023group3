import requests
import unittest
from django.test import TestCase, Client
from .models import Country
from .forms import CountryForm
from .views import get_country_info

class CountryViewTest(TestCase):
    def setUp(self):
        self.client = Client()

    def test_get_country_info(self):
        country_name = "Germany"
        capital, population = get_country_info(country_name)
        self.assertEqual(capital, "Berlin")
        self.assertEqual(population, 83240525)


    def test_country_view_post(self):
        form_data = {'name': 'Germany'}
        response = self.client.post('/countries/', form_data)
        self.assertEqual(response.status_code, 302)
        self.assertRedirects(response, '/countries/recent/')

        country = Country.objects.last()
        self.assertEqual(country.name, 'Germany')
        self.assertEqual(country.capital, 'Berlin')
        self.assertEqual(country.population, 83240525)

    def test_recent_countries(self):
        Country.objects.create(name='Germany', capital='Berlin', population=83149300)
        Country.objects.create(name='France', capital='Paris', population=66991000)
        Country.objects.create(name='Spain', capital='Madrid', population=46940000)

        response = self.client.get('/countries/recent/')
        self.assertEqual(response.status_code, 200)
        self.assertTemplateUsed(response, 'countries/recent_countries.html')

        countries = response.context['countries']
        self.assertEqual(len(countries), 3)
        self.assertEqual(countries[0].name, 'Spain')
        self.assertEqual(countries[1].name, 'France')
        self.assertEqual(countries[2].name, 'Germany')

class CountryFormTest(TestCase):
    def test_country_form_valid(self):
        form_data = {'name': 'Germany'}
        form = CountryForm(data=form_data)
        self.assertTrue(form.is_valid())

    def test_country_form_invalid(self):
        form_data = {'name': ''}
        form = CountryForm(data=form_data)
        self.assertFalse(form.is_valid())
        self.assertEqual(form.errors['name'], ['This field is required.'])

if __name__ == '__main__':
    unittest.main()
