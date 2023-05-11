from django.db import models
from enum import Enum

class ValidationState(Enum):
    COULD_NOT_VALIDATE = "could_not_validate"
    ACCEPTED = "accepted"
    REJECTED = "rejected"

class CommentValidationHistory(models.Model):
    comment_body = models.TextField()
    validation_state = models.CharField(max_length=20, choices=[(tag, tag.value) for tag in ValidationState])
    toxicity_level = models.FloatField(null=True, blank=True)
    class Meta:
        ordering = ['comment_body']
