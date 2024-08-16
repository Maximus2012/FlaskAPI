from marshmallow import Schema, fields
from setup_db import db


class User(db.Model):
    __table_name__ = 'user'
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(255))
    name = db.Column(db.String(255))
    password = db.Column(db.String(255))
    

class UserSchema(Schema):
    id = fields.Int()
    email = fields.Str()
    name = fields.Str()
    password = fields.Str()
    