from django.test import TestCase
from .models import Feedback

# Create your tests here.

class FeedbackTestCase(TestCase):
    def setUp(self):
        self.relative_path = "/transportation/"
    def test_feedback_creation(self):
        payload = {
            "name": "Test_User",
            "email": "test@test.com",
            "feedback": "This is a test feedback."
        }
        url = "feedbacks/"
        response = self.client.post(self.relative_path + url, payload, format='json')
        self.assertEqual(response.status_code, 201)
        self.assertEqual(Feedback.objects.count(), 1)
        f = Feedback.objects.get()
        self.assertEqual(f.name, "Test_User")
        self.assertEqual(f.email, "test@test.com")
        self.assertEqual(f.feedback, "This is a test feedback.")
    def test_feedback_list(self):
        url = "feedbacks/"
        response = self.client.get(self.relative_path + url)
        self.assertEqual(response.status_code, 200)
    def test_external_api(self):
        url = "ticket-prices/"
        response = self.client.get(self.relative_path + url)
        self.assertEqual(response.status_code, 200)