from django import forms
from .models import University


class CreateUniversityWithReviewForm(forms.ModelForm):
    class Meta:
        model = University
        fields = ['name', 'web_page']
