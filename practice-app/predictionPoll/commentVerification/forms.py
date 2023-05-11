from django import forms

class CommentCheckForm(forms.Form):
    # this form object is going to be translated into html like that:
    # <p>
    #     <label for="id_text">Enter your comment:</label>
    #     <input type="text" name="comment" required="" id="id_text">
    # </p>
    comment = forms.CharField(label="Enter your comment:", widget=forms.TextInput)
