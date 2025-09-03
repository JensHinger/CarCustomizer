from models.extra import Extra
from model import db

def get_all_extras_for_car(car_id: int):
    extras = db.session.execute(
        db.select(Extra).where(Extra.car_id == car_id)
    ).scalars().all()
    return extras
