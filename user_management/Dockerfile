FROM python:3.12.4-slim

ENV PYTHONUNBUFFERED=1

WORKDIR /app

COPY requirements.txt .

RUN pip install -r requirements.txt

COPY . .

RUN python manage.py makemigrations oauth2_provider

RUN python manage.py migrate

EXPOSE 8000

CMD ["gunicorn", "--workers=3", "--bind", "0.0.0.0:8000", "user_management.wsgi:application"]
