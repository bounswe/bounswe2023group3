FROM python:3.8-slim-buster

WORKDIR /practice-app

COPY . .
RUN pip3 install -r requirements.txt
RUN apt-get update && apt-get -y install tk-dev

CMD ["python3", "predictionPoll/manage.py", "runserver", "0.0.0.0:8000"]