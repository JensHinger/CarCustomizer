from flask import Flask
from dotenv import load_dotenv
import os
from data import data

load_dotenv()

def create_app():
    app = Flask(__name__)

    app.config["SQLALCHEMY_DATABASE_URI"] = os.environ.get("PGURLSQLALCHEMY")

    from models import Car, Engine, Wheel, Color, Extra, Order, Configuration, ConfigurationExtra
    from model import db
    db.init_app(app)

    with app.app_context():
        db.create_all()

    # Seed the database with test data
    @app.route("/seed")
    def seed():

        try:
            db.session.query(Car).delete()
            db.session.query(Engine).delete()
            db.session.query(Color).delete()
            db.session.query(Wheel).delete()
            db.session.query(Extra).delete()
            db.session.query(Order).delete()
            db.session.query(Configuration).delete()
            db.session.query(ConfigurationExtra).delete()
            db.session.commit()
        except Exception as e:
            db.session.rollback()
            return "Error:", e

        try:

            for car_data in data["cars"]:
                car = Car(id=car_data["id"], name=car_data["name"], price=car_data["basePrice"])
                db.session.add(car)

            for e in car_data["engines"]:
                db.session.add(Engine(id=e["id"], name=e["name"], price=e["price"], car=car))

            for c in car_data["colors"]:
                db.session.add(Color(id=c["id"], name=c["name"], price=c["price"], car=car))

            for w in car_data["rims"]:
                db.session.add(Wheel(id=w["id"], name=w["name"], price=w["price"], car=car))

            for x in car_data["extras"]:
                db.session.add(Extra(id=x["id"], name=x["name"], price=x["price"], car=car))

                db.session.commit()
                return "Test data inserted successfully!"
        except Exception as e:
            db.session.rollback()
            return "Error:", e
        finally:
            db.session.close()
            
    from routes.car_routes import car
    from routes.configuration_routes import configuration
    app.register_blueprint(car)
    app.register_blueprint(configuration)
    return app