import json

import requests
from flask import request, render_template, jsonify
from flask_restx import Namespace, Resource, fields

from decorators import auth_required
from implemented import auth_service, user_service
auth_ns = Namespace("auth")

# output_models = auth_ns.model(
#     'Token_Response',
#     {
#         'access_token': fields.String,
#         'refresh_token': fields.String
#     }
# )

@auth_ns.route("/register")
class AuthRegisterView(Resource):
    def post(self):
        print('fdfd2222')
        request_json = request.json
        print(request_json)
        msg, code = user_service.registration(request_json)

        return msg, code

@auth_ns.route("/login")
class AuthLoginView(Resource):

    def post(self):
        print(request.json)
        print('fdfd111')
        request_json = request.json
        print(request_json)
        email = request_json.get("email")
        password = request_json.get("password")
        if None in [email, password]:
            return "Void insert", 401

        token = auth_service.generate_token(email, password)
        print(token.get('access_token'))
        return token
    def put(self):
        request_json = request.json
        token = request_json.get("refresh_token")
        tokens = auth_service.check_token(token)
        return tokens, 201
