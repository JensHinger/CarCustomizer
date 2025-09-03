from models.car import Car
from model import db

def get_all_cars():
    cars = db.session.execute(db.select(Car)).scalars().all()
    return cars

def get_car_by_id(id: int):
    car = db.session.execute(db.select(Car).where(Car.id == id)).scalar_one()
    return car
