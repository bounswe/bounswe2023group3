import requests
from django.shortcuts import render, redirect
from .models import Country
from .forms import CountryForm

def get_country_info(country_name):
    try:
        response = requests.get(f"https://restcountries.com/v3/name/{country_name}?fullText=true")
        response.raise_for_status()  # Raise an exception if the request was unsuccessful
        data = response.json()
        
        if data:
            capital = data[0]['capital'][0] if data[0]['capital'] else "N/A"
            population = data[0]['population']
            return capital, population
    except requests.HTTPError as e:
        return f"An error occurred while fetching data from the API: {e}", None

    return None, None

def country_view(request):
    if request.method == 'POST':
        form = CountryForm(request.POST)
        if form.is_valid():
            country = form.save(commit=False)
            country.capital, country.population = get_country_info(country.name)
            country.save()
            return redirect('countries:recent_countries')

    form = CountryForm()
    return render(request, 'countries/country_form.html', {'form': form})

def recent_countries(request):
    countries = Country.objects.order_by('-id')[:5]
    return render(request, 'countries/recent_countries.html', {'countries': countries})