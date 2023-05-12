from django.test import TestCase, Client
from django.urls import reverse
from .views import forecast, fetch_weather_data, air_quality, fetch_air_quality_data

API_key = '77bf70dde16f9f35d3d9d8702fd32096' 
weather_url = 'https://api.openweathermap.org/data/2.5/weather?q={}&appid={}'
forecast_url = 'https://api.openweathermap.org/data/2.5/forecast?lat={}&lon={}&appid={}' 
air_url = "http://api.openweathermap.org/data/2.5/air_pollution?lat={}&lon={}&appid={}"


class ForecastTestCase(TestCase):
    def setUp(self):
        self.factory = Client()
        self.url = reverse('forecast')

    def test_forecast_get(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, 200)
        self.assertTemplateUsed(response, 'weather_app/forecast.html')

    def test_forecast_post_with_valid_city(self):
        city = 'New York'
        response = self.client.post(self.url, data={'city': city})

        self.assertEqual(response.status_code, 200)
        self.assertTemplateUsed(response, 'weather_app/forecast.html')
        self.assertIsNotNone(response.context.get('weather_data'))
        self.assertIsNotNone(response.context.get('forecast_data'))

    def test_forecast_post_with_empty_city(self):
        response = self.client.post(self.url, data={'city': ''})

        self.assertEqual(response.status_code, 200)
        self.assertTemplateUsed(response, 'weather_app/forecast.html')
        self.assertIsNone(response.context.get('weather_data'))
        self.assertIsNone(response.context.get('forecast_data'))

class FetchWeatherDataTestCase(TestCase):
    def test_fetch_weather_data_with_valid_city(self):
        city = 'New York' 
        weather_data, forecast_data = fetch_weather_data(city, API_key, weather_url, forecast_url)
        self.assertIsNotNone(weather_data)
        self.assertIsNotNone(forecast_data)

        city = 'London' 
        weather_data, forecast_data = fetch_weather_data(city, API_key, weather_url, forecast_url)
        self.assertIsNotNone(weather_data)
        self.assertIsNotNone(forecast_data)

    def test_fetch_weather_data_with_invalid_city(self):
        city = 'Invalid Name'
        weather_data, forecast_data = fetch_weather_data(city, API_key, weather_url, forecast_url)
        self.assertIsNone(weather_data)
        self.assertIsNone(forecast_data)

class AirQualityTestCase(TestCase):
    def setUp(self):
        self.factory = Client()
        self.url = reverse('air_quality')

    def test_air_quality_get(self):
        response = self.client.get(self.url)

        self.assertEqual(response.status_code, 200)
        self.assertTemplateUsed(response, 'weather_app/air_quality.html')

    def test_air_quality_post_with_valid_city(self):
        city = 'New York'
        response = self.client.post(self.url, data={'city': city})

        self.assertEqual(response.status_code, 200)
        self.assertTemplateUsed(response, 'weather_app/air_quality.html')
        self.assertIsNotNone(response.context.get('weather_data'))
        self.assertIsNotNone(response.context.get('air_quality_data'))

    def test_air_quality_post_with_empty_city(self):
        response = self.client.post(self.url, data={'city': ''})

        self.assertEqual(response.status_code, 200)
        self.assertTemplateUsed(response, 'weather_app/air_quality.html')
        self.assertIsNone(response.context.get('weather_data'))
        self.assertIsNone(response.context.get('air_quality_data'))

class FetchAirQualityDataTestCase(TestCase):
    def test_fetch_air_quality_data_with_valid_city(self):
        city = 'New York'
        weather_data, air_quality_data = fetch_air_quality_data(city, API_key, weather_url, air_url)

        self.assertIsNotNone(weather_data)
        self.assertIsNotNone(air_quality_data)

    def test_fetch_air_quality_data_with_invalid_city(self):
        city = 'Invalid Name'
        weather_data, air_quality_data = fetch_air_quality_data(city, API_key, weather_url, air_url)

        self.assertIsNone(weather_data)
        self.assertIsNone(air_quality_data)


