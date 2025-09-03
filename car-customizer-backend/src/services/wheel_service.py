from models import Wheel
from model import db

def get_all_wheels_for_car(car_id: int):
    wheels = db.session.execute(
        db.select(Wheel).where(Wheel.car_id == car_id)
    ).scalars().all()
    return wheels
