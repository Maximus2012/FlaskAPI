from dao.model.user import User


# User's Functional
class UserDao:
    def __init__(self, session):
        self.session = session

    def registation(self, user_data):
        user = User(**user_data)
        self.session.add(user)
        self.session.commit()
        return user

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
