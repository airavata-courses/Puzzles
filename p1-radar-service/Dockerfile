FROM python:3.9

WORKDIR /code

COPY ./requirements.txt /code/requirements.txt

RUN pip install --no-cache-dir numpy
RUN pip install --no-cache-dir --upgrade -r requirements.txt

COPY . /code

EXPOSE 8000
CMD ["python", "server.py"]
# CMD ["uvicorn", "server:app", "--host", "0.0.0.0", "--port", "8000"]
