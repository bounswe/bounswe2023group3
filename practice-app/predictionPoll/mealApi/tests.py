from django.test import TestCase
from .models import Review

# Create your tests here.

class ViewTestCase(TestCase):
    def setUp(self):
        self.relative_path = "/meal/"

    def test_get_random_meal_view(self):
        url = "getRandomMeal/"
        response = self.client.get(self.relative_path + url)
        self.assertEqual(response.status_code, 200)

    def test_reviews_view_get(self):
        url = "reviews/"
        response = self.client.get(self.relative_path + url)
        self.assertEqual(response.status_code, 200)

    def test_reviews_view_post(self):
        payload = {
            "name": "Test_User",
            "meal": "Test_Meal",
            "review": "This is a test review."
        }
        url = "reviews/"
        response = self.client.post(self.relative_path + url, payload, format='json')
        self.assertEqual(response.status_code, 201)
        self.assertEqual(Review.objects.count(), 1)
        review = Review.objects.get()
        self.assertEqual(review.name, "Test_User")
        self.assertEqual(review.meal, "Test_Meal")
        self.assertEqual(review.review, "This is a test review.")