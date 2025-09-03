from flask import Flask
from dotenv import load_dotenv
import os

load_dotenv()

def create_app():
    app = Flask(__name__)

    app.config["SQLALCHEMY_DATABASE_URI"] = os.environ["PGURLSQLALCHEMY"]

    from model import db
    db.init_app(app)
    
    # Just for testing
    @app.route("/")
    def hello():
        return "Hello World"

    from routes.car_routes import car
    app.register_blueprint(car)
    return app