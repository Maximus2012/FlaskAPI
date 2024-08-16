
from dao.user import UserDao
from service.auth import AuthService

from service.user import UserService
from setup_db import db

# Create DAO

user_dao = UserDao(session=db.session)


# Create Service

user_service = UserService(dao=user_dao)
auth_service = AuthService(user_service)


