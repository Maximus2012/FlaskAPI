from dao.model.user import User, Role, UserRoles


# User's Functional
class UserDao:
    def __init__(self, session):
        self.session = session

    def registation(self, user_data):
        user = User(**user_data)
        self.session.add(user)
        self.session.commit()
        role_id = self.get_role(user.id)
        print(user.id)
        print(role_id)
        data = {'user_id': user.id, 'role_id':3}
        role_data = UserRoles(**data)
        self.session.add(role_data)
        self.session.commit()
        return user

    def regisration_role(self, role_data):
        role = Role(**role_data)
        self.session.add(role)
        self.session.commit()
        return role


    def get_one(self, user_id):
        return self.session.query(User).get(user_id)
    def update_password(self, user_data):
        user = self.get_by_email(user_data.get("email"))
        if user_data.get("password") is not None:
            user.password = user_data.get("password")
        self.session.add(user)
        self.session.commit()

    def get_by_email(self, email):
        return self.session.query(User).filter(User.email == email).first()

    def get_by_name(self, name):
        return self.session.query(User).filter(User.name == name).first()

    def get_all(self):
        return self.session.query(User).all()

    def delete(self, user_id):
        del_user = self.session.query(User).get(user_id)
        self.session.delete(del_user)
        self.session.commit()

    def update(self, user_data):
        user = self.get_one(user_data.get("id"))
        if user_data.get("name") is not None:
            user.name = user_data.get("name")
        if user_data.get("email") is not None:
            user.email = user_data.get("email")
        if user_data.get("password") is not None:
            user.password = user_data.get("password")

        self.session.add(user)
        self.session.commit()

    def update_role(self, user_data):
        user = self.get_role(user_data.get("user_id"))
        if user_data.get("role_id") is not None:
            user.role_id = user_data.get("role_id")

        self.session.add(user)
        self.session.commit()


    def get_role(self, user_id):

        role = self.session.query(UserRoles).filter(UserRoles.user_id == user_id).first()

        return role

    def registation_role(self, user_data):
        role = UserRoles(**user_data)
        self.session.add(role)
        self.session.commit()

        return role

    def get_all_role(self):
        return self.session.query(UserRoles).all()