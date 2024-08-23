
from dao.user import UserDao
from service.auth import AuthService
from dao.menu import CategoryDao
from service.user import UserService
from setup_db import db
from service.menu import CategoryService

# Create DAO

user_dao = UserDao(session=db.session)
menu_dao = CategoryDao(session=db.session)

# Create Service

user_service = UserService(dao=user_dao)
auth_service = AuthService(user_service)
category_service = CategoryService(dao=menu_dao)


