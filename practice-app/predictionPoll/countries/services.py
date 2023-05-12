import requests

def get_country_info(country_name):
    response = requests.get(f'https://restcountries.com/v3.1/name/{country_name}')
    data = response.json()

    if data:
        country = data[0]
        useful_info = {
            "name": country["name"]["common"],
            "capital": country["capital"][0] if country["capital"] else "N/A",
            "region": country["region"],
            "subregion": country["subregion"],
            "population": country["population"],
            "languages": ", ".join(country["languages"].values()),
            "flag": country["flags"]["png"],
        }
        return useful_info

    return {"error": "Country not found"}