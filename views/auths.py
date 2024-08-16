from flask import request
from flask_restx import Namespace, Resource

from implemented import auth_service, user_service

auth_ns = Namespace("auth")

@auth_ns.route("/register")
class AuthRegisterView(Resource):
    def post(self):
        request_json = request.json
        print(request_json)
        user = user_service.registration(request_json)

        return "User created", 201, {"location": f"/users/{user.id}"}

@auth_ns.route("/login")
class AuthLoginView(Resource):
    def post(self):
        request_json = request.json
        email = request_json.get("email")
        password = request_json.get("password")

        if None in [email, password]:
            return "Void insert", 401

        token = auth_service.generate_token(email, password)
        return token, 201

    def put(self):
        request_json = request.json
        token = request_json.get("refresh_token")
        tokens = auth_service.check_token(token)
        return tokens, 201
