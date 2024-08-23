from flask import request
from flask_restx import Resource, Namespace

from dao.model.user import UserSchema, UserRoles, UserRolesSchema
from dao.model.menu import *
from decorators import auth_required, admin_required
from implemented import category_service


category_ns = Namespace("category")

@category_ns.route("/", methods=['GET', 'POST'])
class UsersViews(Resource):

    def get(self):
        categories = category_service.get_all()
        users_schema = CategoriesIDSchema(many=True).dump(categories)

        return users_schema, 200

    def post(self):
        request_json = request.json
        msg, code = category_service.registration(request_json)

        return msg, code

@category_ns.route("/<int:category_name>", methods=['GET'])
class UsersViews(Resource):

    def get(self, category_name):
        print(category_name)
        categories = category_service.get_user(category_name)
        print(categories)
        users_schema = CategoriesIDSchema().dump(categories)

        return users_schema, 200


@category_ns.route("/product/<int:user_id>")
class UsersViews(Resource):
    def delete(self, user_id):
            category_service.delete(user_id)
            return "Deleted", 204

    def patch(self, user_id):
        req_json = request.json
        req_json["id"] = user_id
        category_service.update(req_json)
        return "", 204
@category_ns.route("/type", methods=['GET', 'POST'])
class UsersViews(Resource):

    def get(self):
        categories = category_service.get_all_category_type()
        print(categories)
        users_schema = CategorySchema(many=True).dump(categories)

        return users_schema, 200

    def post(self):
        request_json = request.json
        msg, code = category_service.create_category(request_json)

        return msg, code

@category_ns.route("/type/<int:category_id>")
class UsersViews(Resource):
    def delete(self, category_id):
            category_service.delete_category(category_id)
            return "Deleted", 204

    def get(self, category_id):
        user = category_service.get_one_name_category(category_id)
        users_schema = CategorySchema().dump(user)
        return users_schema, 200
    def patch(self, category_id):
        req_json = request.json
        req_json["id"] = category_id
        category_service.update_category(req_json)
        return "", 204