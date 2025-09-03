from flask import Blueprint
from services.car_service import get_all_cars, get_car_by_id
from services.wheel_service import get_all_wheels_for_car
from services.color_service import get_all_colors_for_car
from services.engine_service import get_all_engines_for_car
from services.extra_service import get_all_extras_for_car

car = Blueprint('car', __name__, url_prefix="/car")

@car.route("/")
def view_all_cars():
    cars = get_all_cars()
    return [car.to_dict() for car in cars]

@car.route("/<int:id>")
def get_all_configuration_items_for_car(id: int):
    car = get_car_by_id(id)
    wheels = get_all_wheels_for_car(id)
    engines = get_all_engines_for_car(id)
    colors = get_all_colors_for_car(id)
    extras = get_all_extras_for_car(id)
    return {
        "car": car.to_dict(),
        "engines": [engine.to_dict() for engine in engines],
        "wheels": [wheel.to_dict() for wheel in wheels],
        "colors": [color.to_dict() for color in colors],
        "extras": [extra.to_dict() for extra in extras],
    }
