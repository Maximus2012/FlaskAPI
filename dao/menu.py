
from dao.model.menu import Categories_ID, Category
import os
# User's Functional
class CategoryDao:

    def __init__(self, session):
        self.session = session

    def registation(self, user_data):
        category = Categories_ID(**user_data)
        self.session.add(category)
        self.session.commit()

        print(category.categories_id)

        return category

    def crete_category(self, user_data):
        category = Category(**user_data)
        self.session.add(category)
        self.session.commit()

    def get_Category_one(self, user_id):

        return self.session.query(Categories_ID).get(user_id)
    def get_Category_name_one(self, user_id):
        return self.session.query(Category).get(user_id)

    def get_Category_name(self, user_id):

        categories = self.session.query(Category).filter(Category.id == user_id).all()

        return categories


    def get_Category_all(self):
        return self.session.query(Categories_ID).all()

    def get_Category_all_type(self):
        return self.session.query(Category).all()

    def update_category(self, user_data):
        category = self.get_Category_one(user_data.get("id"))

        if user_data.get("img") is not None:

            category.img = user_data.get("img")
        if user_data.get("name") is not None:
            category.name = user_data.get("name")
        if user_data.get("price") is not None:
            category.price = user_data.get("price")
        if user_data.get("description") is not None:
            category.description = user_data.get("description")
        if user_data.get("categories_id") is not None:
            category.categories_id = user_data.get("categories_id")

        category.discount = user_data.get("discount")
        print(category.discount)
        self.session.add(category)
        self.session.commit()

    def update_category_name(self, user_data):
        category = self.get_Category_name_one(user_data.get("id"))
        if user_data.get("category_type") is not None:
            category.category_type = user_data.get("category_type")

        self.session.add(category)
        self.session.commit()

    def delete(self, user_id):
        del_category = self.session.query(Categories_ID).get(user_id)
        os.remove(f'frontend/src/Main/img/ingredients/{del_category.img}')
        self.session.delete(del_category)
        self.session.commit()

    def delete_category(self, user_id):
        del_category = self.session.query(Category).get(user_id)
        self.session.delete(del_category)
        self.session.commit()