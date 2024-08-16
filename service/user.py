import base64
import hashlib
import hmac

from constants import PWD_HASH_SALT, PWD_HASH_ITERATIONS
from dao.user import UserDao


class UserService:
    """
    User's CRUD class
    """

    def __init__(self, dao: UserDao):
        self.dao = dao

    def registration(self, user_data: dict):
        """
        Create User
        """
        user_data["password"] = self.get_hash(user_data.get("password"))
        return self.dao.registation(user_data)


    def update_password(self, user_data: dict):
        """
        Update User's password
        """

        user = self.get_by_email(user_data.get("email"))
        print(self.compare_passwords(user.password, user_data.get("old_password")))
        if self.compare_passwords(user.password, user_data.get("old_password")):
            user_data["password"] = self.get_hash(user_data["password"])
            return self.dao.update_password(user_data), 201

    def get_by_email(self, email: str) -> UserDao:
        """
        Find User via email
        """
        return self.dao.get_by_email(email)

    def get_hash(self, password: str) -> bytes:
        """
        Hash user password
        """
        return base64.b64encode(hashlib.pbkdf2_hmac(
            'sha256',
            password.encode('utf-8'),  # Convert the password to bytes
            PWD_HASH_SALT,
            PWD_HASH_ITERATIONS
        ))

    def compare_passwords(self, hash_password: bytes, password: str) -> bool:
        """
        Compare passwords
        """
        return hmac.compare_digest(hash_password, base64.b64encode(hashlib.pbkdf2_hmac(
            'sha256',
            password.encode(),  # Convert the password to bytes
            PWD_HASH_SALT,
            PWD_HASH_ITERATIONS
        )))
