from marshmallow import Schema, fields
from setup_db import db


class User(db.Model):
    __table_name__ = 'user'
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(255))
    name = db.Column(db.String(255))
    password = db.Column(db.String(255))
    roles = db.relationship('Role', secondary='user_roles')


class UserSchema(Schema):
    id = fields.Int()
    email = fields.Str()
    name = fields.Str()
    password = fields.Str()

class UserRolesSchema1(Schema):
    id = fields.Int()
    email = fields.Str()
    name = fields.Str()
    password = fields.Str()
    role_id = fields.Int()

class UserRolesSchema(Schema):
    id = fields.Int()
    user_id = fields.Int()
    role_id = fields.Int()

class Role(db.Model):
    __tablename__ = 'roles'
    id = db.Column(db.Integer(), primary_key=True)
    name = db.Column(db.String(50), unique=True)

class UserRoles(db.Model):
    __tablename__ = 'user_roles'
    id = db.Column(db.Integer(), primary_key=True)
    user_id = db.Column(db.Integer(), db.ForeignKey('user.id', ondelete='CASCADE'))
    role_id = db.Column(db.Integer(), db.ForeignKey('roles.id', ondelete='CASCADE'))