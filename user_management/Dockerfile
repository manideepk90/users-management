FROM python:3.12.4-slim

WORKDIR /app

ENV PYTHONUNBUFFERED=1

COPY requirements.txt .

# RUN apt-get update && apt-get install -y gcc g++

RUN pip install -r requirements.txt

COPY . .

CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
