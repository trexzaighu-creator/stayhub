FROM python:3.11-slim

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

WORKDIR /app

COPY requirements.txt /app/
RUN pip install --no-cache-dir -r requirements.txt

COPY . /app/

RUN mkdir -p /app/uploads

CMD ["gunicorn", "backend_django.wsgi:application", "-w", "2", "-b", "0.0.0.0:8000"]
