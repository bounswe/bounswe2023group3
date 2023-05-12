from django import forms


class OrderForm(forms.Form):
    price = forms.DecimalField(max_digits=10, decimal_places=2)
    quantity = forms.DecimalField(max_digits=10, decimal_places=2)
    side = forms.ChoiceField(choices=[('buy', 'buy'), ('sell', 'sell')])
    type = forms.ChoiceField(choices=[('market', 'market'), ('limit', 'limit')])
