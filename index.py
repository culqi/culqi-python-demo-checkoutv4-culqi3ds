from flask import Flask, request, render_template
from flask_restful import Resource, Api
from copy import deepcopy
from uuid import uuid4

from pathlib import Path
import sys
from flask import json

path_root = Path(__file__).parents[2]
sys.path.append(str(path_root))
print(sys.path)

from culqi2 import __version__
from culqi2.client import Culqi
from culqi2.resources import Card
from culqi2.resources import Customer
from culqi2.resources import Charge


app = Flask(__name__)
api = Api(app)
public_key = "pk_test_e94078b9b248675d"
private_key = "sk_test_c2267b5b262745f0"
rsa_id = ""
rsa_public_key = ""
port = 5100


if sys.argv.__len__() > 1:
    port = sys.argv[1]
print("Api running on port : {} ".format(port))

@app.route('/',  methods=['GET', 'POST'])
def home():
    return render_template('index.html')

@app.route('/card')
def card():
    return render_template('index-card.html')

@app.route('/culqi/generateCards',  methods=['POST'])
def generatecard():
    body = request.json
    version = __version__

    culqi = Culqi(public_key, private_key)
    card = Card(client=culqi)


    card = card.create(body)
    response = app.response_class(
        response=json.dumps(card["data"]),
        status=json.dumps(card["status"]),
        mimetype='application/json'
    )
    return response
@app.route('/culqi/generateCustomer',  methods=['POST'])
def generatecutomer():
    body = request.json
    version = __version__

    culqi = Culqi(public_key, private_key)
    customer = Customer(client=culqi)
    data = {
        "first_name": body["first_name"],
        "last_name": body["last_name"],
        "email": body["email"],
        "address": body["address"],
        "address_city": body["address_city"],
        "country_code": body["country_code"],
        "phone_number": body["phone_number"],
    }
    card = customer.create(data)
    response = app.response_class(
        response=json.dumps(card["data"]),
        status=json.dumps(card["status"]),
        mimetype='application/json'
    )
    return response
@app.route('/culqi/generateCharge',  methods=['POST'])
def generatecharge():
    body = request.json
    version = __version__

    culqi = Culqi(public_key, private_key)
    charge = Charge(client=culqi)
    print (rsa_public_key)
    print (rsa_id)
    options = {}
    options["rsa_public_key"] = rsa_public_key
    options["rsa_id"] = rsa_id
    if len(rsa_id) == 0:
        card = charge.create(body)
    else:
        card = charge.create(body, **options)

    print(card)
    response = app.response_class(
        response=json.dumps(card["data"]),
        status=json.dumps(card["status"]),
        mimetype='application/json'
    )
    return response



if __name__ == '__main__':
    app.run(host="0.0.0.0", port=port)

@app.route('/')
def home():
    return render_template('index.html')


if __name__ == '__main__':
    app.run(host="0.0.0.0", port=port)

