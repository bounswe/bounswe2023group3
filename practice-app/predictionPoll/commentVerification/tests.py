from django.test import TestCase, Client
from django.urls import reverse
from .models import CommentValidationHistory

class CommentVerificationTests(TestCase):
    def setUp(self):
        self.client = Client()

    def test_moderate_comment_get_request(self):
        response = self.client.get(reverse('moderate_comment'))
        self.assertEqual(response.status_code, 200)
        # going to check for the content maybe

    def test_moderate_comment_post_request(self):
        data = {'comment': 'Test comment'}
        response = self.client.post(reverse('moderate_comment'), data)
        self.assertEqual(response.status_code, 200)
        # going to check for the content maybe

        # check if last comment is added!!
        comment_exists = CommentValidationHistory.objects.filter(comment_body=data['comment']).exists()
        self.assertTrue(comment_exists)

    def test_comment_history(self):
        response = self.client.get(reverse('comment_history'))
        self.assertEqual(response.status_code, 200)
        # going to check for the content maybe

        self.assertContains(response, '<html>')
        self.assertContains(response, 'Comment History')
