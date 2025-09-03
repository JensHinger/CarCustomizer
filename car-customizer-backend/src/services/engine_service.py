from models import Engine
from model import db

def get_all_engines_for_car(car_id: int):
    engines = db.session.execute(
        db.select(Engine).where(Engine.car_id == car_id)
    ).scalars().all()
    return engines
