FROM python:3.9-alpin

WORKDIR /app

COPY requirements.txt

RUN pip install --no-cache-dir -r requirements.txt

COPY . .

RUN npm run build

CMD ["gunicorn", "Integrated.wsgi:application", "--bind", "0.0.0.0:8000"]