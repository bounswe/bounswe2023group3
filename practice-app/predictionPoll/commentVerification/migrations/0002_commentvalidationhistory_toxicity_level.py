# Generated by Django 4.2.1 on 2023-05-11 11:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('commentVerification', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='commentvalidationhistory',
            name='toxicity_level',
            field=models.FloatField(blank=True, null=True),
        ),
    ]
