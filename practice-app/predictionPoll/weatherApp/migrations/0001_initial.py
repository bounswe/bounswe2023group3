# Generated by Django 4.2.1 on 2023-05-11 16:39

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Weather',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('city', models.CharField(max_length=200)),
                ('countryCode', models.CharField(max_length=10)),
                ('coordinateX', models.DecimalField(decimal_places=2, max_digits=6)),
                ('coordinateY', models.DecimalField(decimal_places=2, max_digits=6)),
                ('temperature', models.DecimalField(decimal_places=2, max_digits=6)),
                ('pressure', models.IntegerField()),
                ('humidity', models.IntegerField()),
            ],
        ),
    ]