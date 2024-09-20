import base64
import hashlib
import hmac

from constants import PWD_HASH_SALT, PWD_HASH_ITERATIONS
from dao.menu import CategoryDao


class CategoryService:
    """
    Category's CRUD class
    """

    def __init__(self, dao: CategoryDao):
        self.dao = dao


    def registration(self, user_data: dict):
        """
        Create User
        """

        user_id = self.dao.registation(user_data)


        return "Product created", 201

    def create_category(self, user_data:dict):
        self.dao.crete_category(user_data)
        return "Category created", 201

    def get_all(self):
        """
        Return all users
        """
        return self.dao.get_Category_all()

    def get_all_category_type(self):
        return self.dao.get_Category_all_type()
    def delete(self, user_id):
        return self.dao.delete(user_id)

    def get_category_with_id(self, user_id):
        return self.dao.get_category_with_category_id(user_id)
    def get_user(self, category_name):
        return self.dao.get_Category_one(category_name)

    def get_one_name_category(self, category_id):
        return self.dao.get_Category_name_one(category_id)

    def update(self, user_data: dict):
        """
        Update user`s data
        """

        self.dao.update_category(user_data)

    def update_category(self, user_data: dict):
        self.dao.update_category_name(user_data)

    def delete_category(self, category_id):
        return self.dao.delete_category(category_id)