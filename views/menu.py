from flask import request, send_file
from flask_restx import Resource, Namespace
import os
from dao.model.user import UserSchema, UserRoles, UserRolesSchema
from dao.model.menu import *
from decorators import auth_required, restaraunt_required
from implemented import category_service
from werkzeug.utils import secure_filename

category_ns = Namespace("category")
file_name = ''
@category_ns.route("/", methods=['GET', 'POST'])
class UsersViews(Resource):

    def get(self):
        categories = category_service.get_all()
        users_schema = CategoriesIDSchema(many=True).dump(categories)

        return users_schema, 200

    @restaraunt_required
    @auth_required
    def post(self):
        try:
            target = os.path.join('frontend/src/Main/img/', 'server_img')
            file = request.files['file']
            filename = secure_filename(file.filename)
            destination = "/".join([target, filename])
            global file_name
            file_name = file.filename
            file.save(destination)
        except:

            request_json = request.json
            request_json['img'] = file_name
            file_name = ''
            print(request_json)

        # request_json['img'] = request_json['img'].split("\\")[-1]
            msg, code = category_service.registration(request_json)
            return msg, code




@category_ns.route("/<int:category_name>", methods=['GET'])
class UsersViews(Resource):

    def get(self, category_name):

        categories = category_service.get_user(category_name)

        users_schema = CategoriesIDSchema().dump(categories)

        return users_schema, 200


@category_ns.route("/product/<int:user_id>")
class UsersViews(Resource):

    @restaraunt_required
    @auth_required
    def delete(self, user_id):
            category_service.delete(user_id)
            return "Deleted", 204


    @restaraunt_required
    @auth_required
    def patch(self, user_id):

        try:
            print('fdfd')
            file = request.files['file']
            categories = category_service.get_user(user_id)
            os.remove(f'frontend/src/Main/img/server_img/{categories.img}')
            target = os.path.join('frontend/src/Main/img/', 'server_img')

            filename = secure_filename(file.filename)
            destination = "/".join([target, filename])
            global file_name
            file_name = file.filename
            file.save(destination)


        except:
            req_json = request.json
            req_json["id"] = user_id
            if file_name != '':
                req_json['img'] = file_name
            file_name = ''
            category_service.update(req_json)



        return "", 204
@category_ns.route("/type", methods=['GET', 'POST'])
class UsersViews(Resource):

    def get(self):
        categories = category_service.get_all_category_type()
        print(categories)
        users_schema = CategorySchema(many=True).dump(categories)

        return users_schema, 200


    @restaraunt_required
    @auth_required
    def post(self):
        request_json = request.json
        msg, code = category_service.create_category(request_json)

        return msg, code

@category_ns.route("/type/<int:category_id>")
class UsersViews(Resource):

    @restaraunt_required
    @auth_required
    def delete(self, category_id):
            category_service.delete_category(category_id)

            return "Deleted", 204

    def get(self, category_id):
        user = category_service.get_one_name_category(category_id)
        users_schema = CategorySchema().dump(user)
        return users_schema, 200


    @restaraunt_required
    @auth_required
    def patch(self, category_id):
        req_json = request.json
        req_json["id"] = category_id
        category_service.update_category(req_json)
        return "", 204

@category_ns.route("/product/get/<int:categories_id>")
class UsersViews(Resource):
    def get(self, categories_id):
        answer = category_service.get_category_with_id(categories_id)
        user_schema = CategoriesIDSchema(many=True).dump(answer)
        return user_schema, 200