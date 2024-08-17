from flask import request, abort
import jwt

from constants import JWT_ALGORITHM, JWT_SECRET_KEY


def auth_required(func):
    def wrapper(*args, **kwargs):
        print(request.json)
        if "Authorization" not in request.headers:
            print('Вы не вошли в аккаунт')
            abort(401, "Вы не вошли в аккаунт")

        data = request.headers["Authorization"]
        print(request.get_json(force=True, silent=True))
        token = data.split("Bearer ")[-1]
        try:
            jwt.decode(token, JWT_SECRET_KEY, algorithms=[JWT_ALGORITHM])
        except Exception as e:
            print(f"jwt decode error {e}")
            abort(401)
        return func(*args, **kwargs)

    return wrapper
