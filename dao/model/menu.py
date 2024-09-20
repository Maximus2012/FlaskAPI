from marshmallow import Schema, fields
from setup_db import db


class Categories_ID(db.Model):
    __table_name__ = 'categories'
    id = db.Column(db.Integer, primary_key=True)
    img = db.Column(db.String(255))
    name = db.Column(db.String(255))
    price = db.Column(db.Integer)
    discount = db.Column(db.Integer)
    description = db.Column(db.String(255))
    categories_id = db.Column(db.Integer(), db.ForeignKey('categories_id.id', ondelete='CASCADE'))



class CategoriesIDSchema(Schema):
    id = fields.Int()
    img = fields.Str()
    name = fields.Str()
    price = fields.Int()
    discount = fields.Int()
    description = fields.Str()
    categories_id = fields.Int()


class Category(db.Model):
    __tablename__ = 'category'
    id = db.Column(db.Integer(), primary_key=True)
    category_type = db.Column(db.String(255))


class CategorySchema(Schema):
    id = fields.Int()
    category_type = fields.Str()



