from flask import Flask, render_template
from flask_restx import Api
from flask_cors import CORS, cross_origin
from config import Config
from setup_db import db
from views.auths import auth_ns
from views.users import user_ns



def create_app(config_object: Config) -> Flask:
    app = Flask(__name__)
    app.config.from_object(config_object)
    app.app_context().push()


    register_extensions(app)

    return app


def register_extensions(app: Flask) -> None:
    """ Init database and namespaces"""

    CORS(app, supports_credentials=True)
    db.init_app(app)
    with app.app_context():
        db.create_all()
    api = Api(
        authorizations={'Bearer': {'name': 'Authorization', 'in': 'header', 'description': 'Authorization: Bearer <access_token>', 'required': 'true'}},
        title="My Flask Project",
        doc='/docs')
    api.init_app(app)
    api.add_namespace(user_ns)
    api.add_namespace(auth_ns)
    # Add namespaces



app = create_app(Config())
app.debug = True

if __name__ == '__main__':
    app.run(port=25000, debug=True)