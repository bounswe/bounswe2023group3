import json

from django.test import TestCase
from .models import University, Review
from django.urls import reverse


class UniversityEndpointTests(TestCase):
    def setUp(self):
        first_university = University.objects.create(
            name="Bogazici University",
            web_page="https://www.boun.edu.tr/",
            ranking=5,
        )
        second_university = University.objects.create(
            name="Bilkent University",
            web_page="https://w3.bilkent.edu.tr/bilkent/",
        )
        Review.objects.create(
            comment="not bad",
            university_id=first_university.id
        )
        self.Universities = [first_university, second_university]

    def test_list_universities(self):
        response = self.client.get(reverse('listing'))
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json(), [
            {"name": "Bogazici University", "web_page": "https://www.boun.edu.tr/",
             "reviews": [{"comment": "not bad"}]},
            {"name": "Bilkent University", "web_page": "https://w3.bilkent.edu.tr/bilkent/", "reviews": []}
        ])

    def test_create_university_with_review_successful(self):
        body = {
            "name": "Koc University",
            "web_page": "https://www.ku.edu.tr/",
            "review": "so so"
        }
        encode_data = json.dumps(body).encode('utf-8')
        response = self.client.generic("POST", reverse('create'), encode_data)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json(), {
            "name": "Koc University",
            "web_page": "https://www.ku.edu.tr/",
            "review": "so so"
        })

    def test_create_university_with_review_missing_parameter(self):
        body = {
            "name": "Koc University",
            "review": "so so"
        }
        encode_data = json.dumps(body).encode('utf-8')
        response = self.client.generic("POST", reverse('create'), encode_data)
        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.json(), {'web_page': ['This field is required.']})

    def test_list_all_university_in_turkey(self):
        response = self.client.get(reverse('universitiesInTurkey'))
        self.assertEqual(response.status_code, 200)
