from flask import Flask
from dotenv import load_dotenv
from setup import seed_database
import os

load_dotenv()

def create_app():
    app = Flask(__name__)

    app.config["SQLALCHEMY_DATABASE_URI"] = os.environ["PGURLSQLALCHEMY"]

    from model import db
    db.init_app(app)
    
    # Seed the database with test data
    @app.route("/seed")
    def seed():
        res = seed_database()
        return res
        
    from routes.car_routes import car
    from routes.configuration_routes import configuration
    app.register_blueprint(car)
    app.register_blueprint(configuration)
    return app