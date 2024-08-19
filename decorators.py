from flask import request, abort
import jwt

from constants import JWT_ALGORITHM, JWT_SECRET_KEY
from implemented import user_service

def auth_required(func):
    def wrapper(*args, **kwargs):
        if "Authorization" not in request.headers:
            print('Вы не вошли в аккаунт')
            abort(401, "Вы не вошли в аккаунт")

        data = request.headers["Authorization"]
        token = data.split("Bearer ")[-1]
        try:
            jwt.decode(token, JWT_SECRET_KEY, algorithms=[JWT_ALGORITHM])
        except Exception as e:
            print(f"jwt decode error {e}")
            abort(401)
        return func(*args, **kwargs)

    return wrapper


def admin_required(func):
    def wrapper(*args, **kwargs):

        if request.headers["Role"] == '1':
            print('Succeed')
        else:
            print('Your are not admin')
            abort(403, "You are not admin")

        return func(*args, **kwargs)

    return wrapper

def restaraunt_required(func):
    def wrapper(*args, **kwargs):
        if request.headers["Role"] == '2':
            print('Succeed')
        else:
            print('Your are not User')
            abort(403, "You are not User")

        return func(*args, **kwargs)

    return wrapper


def user_required(func):
    def wrapper(*args, **kwargs):
        if request.headers["Role"] == '3':
            print('Succeed')
        else:
            print('Your are not shef')
            abort(403, "You are not shef")

        return func(*args, **kwargs)

    return wrapper