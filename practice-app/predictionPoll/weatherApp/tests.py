from django.test import TestCase

# Create your tests here.


class WeatherTestCase(TestCase):
    def setUp(self):

        self.relative_path = "/weather-app/"

    def test_feedback_creation(self):
        city = {"city": 'istanbul'}
        url = ''
        response = self.client.post(self.relative_path + url, city, format='json')
        self.assertEqual(response.status_code, 200)

    def test_istanbul_end_point(self):

        url = "istanbul/"
        response = self.client.get(self.relative_path + url)
        self.assertEqual(response.status_code, 200)

    def test_all_weathers_end_point(self):
        url = "all-weathers/"
        response = self.client.get(self.relative_path + url)
        self.assertEqual(response.status_code, 200)
