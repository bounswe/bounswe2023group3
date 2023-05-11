from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Weather',
            fields=[
                ('id', models.AutoField(primary_key=True)),
                ('city', models.CharField(max_length=200)),
                ('countryCode', models.CharField(max_length=10)),
                ('coordinateX', models.DecimalField(max_digits=6, decimal_places=2, null=False, blank=False)),
                ('coordinateY', models.DecimalField(max_digits=6, decimal_places=2, null=False, blank=False)),
                ('temperature', models.DecimalField(max_digits=6, decimal_places=2, null=False, blank=False)),
                ('pressure', models.IntegerField(null=False, blank=False)),
                ('humidity', models.IntegerField(null=False, blank=False)),
            ],
        ),
    ]