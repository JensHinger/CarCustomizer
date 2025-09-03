from models.color import Color
from model import db

def get_all_colors_for_car(car_id: int):
    colors = db.session.execute(
        db.select(Color).where(Color.car_id == car_id)
    ).scalars().all()
    return colors
