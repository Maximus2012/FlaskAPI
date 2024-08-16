from flask import request
from flask_restx import Resource, Namespace

from dao.model.user import UserSchema
from decorators import auth_required
from implemented import user_service

user_ns = Namespace("users")

# @user_ns.route("/")
# class UsersViews(Resource):
#     # def post(self):
#     #     req_json = request.json
#     #     user = user_service.registration(req_json)
#     #     print(req_json)
#     #     print(user)
#     #     return "Creation successed", 201, {"location": f"/users/{user.id}"}

@user_ns.route("/password")
class ChangeUserPassword(Resource):
    @auth_required
    def put(self):
        req_json = request.json
        user_service.update_password(req_json)
        return "Change successed", 201