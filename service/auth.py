import calendar
import datetime

import jwt


from constants import JWT_SECRET_KEY, JWT_ALGORITHM
from service.user import UserService


class AuthService:
    def __init__(self, user_service: UserService):
        self.user_service = user_service

    def generate_token(self, email, password, is_refresh=False):
        user = self.user_service.get_by_email(email)

        if user is None:
            raise Exception()

        if not is_refresh:
            if not self.user_service.compare_passwords(user.password,password ):
                raise Exception()

        data = {
            "email": user.email,
            "password": str(user.password)
        }

        access_token_lifetime = datetime.datetime.utcnow() + datetime.timedelta(minutes=30)
        data["exp"] = calendar.timegm(access_token_lifetime.timetuple())
        access_token = jwt.encode(data, JWT_SECRET_KEY, algorithm=JWT_ALGORITHM)

        refresh_token_lifetime = datetime.datetime.utcnow() + datetime.timedelta(days=130)
        data["exp"] = calendar.timegm(refresh_token_lifetime.timetuple())
        refresh_token = jwt.encode(data, JWT_SECRET_KEY, algorithm=JWT_ALGORITHM)  

        return {"access_token": access_token, "refresh_token": refresh_token}

    def check_token(self, refresh_token):
        data = jwt.decode(refresh_token, JWT_SECRET_KEY, algorithms=[JWT_ALGORITHM])
        user = self.user_service.get_by_email(data.get("email"))
        if user is None:
            raise Exception()

        return self.generate_token(user.email, str(user.password), is_refresh=True)
