import json

from flask import request
from flask_restx import Resource, Namespace

from dao.model.user import UserSchema, UserRoles, UserRolesSchema
from decorators import auth_required, admin_required
from implemented import user_service

user_ns = Namespace("users")

@user_ns.route("/", methods=['GET'])
class UsersViews(Resource):
    @auth_required
    @admin_required
    def get(self):
        users = user_service.get_all()
        users_schema = UserSchema(many=True).dump(users)

        return users_schema, 200
# class UsersViews(Resource):
#     # def post(self):
#     #     req_json = request.json
#     #     user = user_service.registration(req_json)
#     #     print(req_json)
#     #     print(user)
#     #     return "Creation successed", 201, {"location": f"/users/{user.id}"}
@user_ns.route("/<int:user_id>")
class UsersViews(Resource):
    @auth_required
    @admin_required
    def delete(self, user_id):
            user_service.delete(user_id)
            return "Deleted", 204
    @auth_required
    @admin_required
    def get(self, user_id):
            user = user_service.get_user(user_id)
            users_schema = UserSchema().dump(user)
            return users_schema, 200

    @auth_required
    @admin_required
    def patch(self, user_id):
        req_json = request.json
        req_json["id"] = user_id
        user_service.update(req_json)
        return "", 204

@user_ns.route("/password")
class ChangeUserPassword(Resource):
    @auth_required
    def put(self):
        req_json = request.json
        user_service.update_password(req_json)
        return "Change successed", 201


@user_ns.route("/role/<int:user_id>")
class UsersViews(Resource):
    @auth_required
    @admin_required
    def get(self, user_id):
            user = user_service.get_user_role(user_id)
            print(user)
            users_schema = UserRolesSchema().dump(user)
            print(type(users_schema))

            return users_schema, 200
    @auth_required
    @admin_required
    def patch(self, user_id):
        req_json = request.json
        req_json["user_id"] = user_id
        user_service.update_role(req_json)
        return "", 204


@user_ns.route("/role")
class UserViews(Resource):
    @auth_required
    @admin_required
    def get(self):
        roles = user_service.get_all_role()
        users = user_service.get_all()
        users_schema = UserSchema(many=True).dump(users)
        roles_schema = UserRolesSchema(many=True).dump(roles)

        for i in range(len(users_schema)):
            users_schema[i]['role_id'] =roles_schema[i]['role_id']
        return users_schema, 200