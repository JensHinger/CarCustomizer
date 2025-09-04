FROM python:slim

RUN apt-get update && \
	apt-get install -y libpq-dev gcc

COPY requirements.txt requirements.txt
RUN pip install -r requirements.txt
RUN pip install gunicorn

COPY src src
WORKDIR src

EXPOSE 5000
CMD ["gunicorn", "-b :5000", "app_factory:create_app()"]
