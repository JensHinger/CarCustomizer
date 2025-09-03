from sqlalchemy import create_engine
from model import Base
from sqlalchemy.orm import sessionmaker
import os 
from dotenv import load_dotenv

load_dotenv()

def seed_database():

    engine = create_engine(os.getenv("PGURLSQLALCHEMY"))

    from models import Car
    from models import Color
    from models import Engine
    from models import Wheel
    from models import Extra
    from models import Configuration
    from models import Order
    from models import ConfigurationExtra

    Base.metadata.drop_all(engine)
    Base.metadata.create_all(engine)

    from models.data import data

    SessionLocal = sessionmaker(bind=engine)

    session = SessionLocal()
    try:

        for car_data in data["cars"]:
            car = Car(id=car_data["id"], name=car_data["name"], price=car_data["basePrice"])
            session.add(car)

            for e in car_data["engines"]:
                session.add(Engine(id=e["id"], name=e["name"], price=e["price"], car=car))

            for c in car_data["colors"]:
                session.add(Color(id=c["id"], name=c["name"], price=c["price"], car=car))

            for w in car_data["rims"]:
                session.add(Wheel(id=w["id"], name=w["name"], price=w["price"], car=car))

            for x in car_data["extras"]:
                session.add(Extra(id=x["id"], name=x["name"], price=x["price"], car=car))

        session.commit()
        return "Test data inserted successfully!"
    except Exception as e:
        session.rollback()
        return "Error:", e
    finally:
        session.close()