from flask import Blueprint, request
from services.configuration_service import insert_configuration, get_configuration_by_id

configuration = Blueprint('configuration', __name__, url_prefix="/configuration")

@configuration.route("/", methods=["POST"])
def create_config():
    engine = int(request.json["engine"])
    color = int(request.json["color"])
    wheel = int(request.json["wheel"])
    action = request.json["action"]
    car = int(request.json["car"])

    if "extras" not in request.json:
        extras = []
    else:
        extras = [int(extra) for extra in request.json["extras"]]

    result = insert_configuration(
        car_id=car,
        engine_id=engine,
        color_id=color,
        wheel_id=wheel,
        extras=extras,
        action=action
    )

    return result

@configuration.route("/<int:id>")
def view_configuration(id: int):
    configuration = get_configuration_by_id(id)
    return {
        "car_id": configuration.car_id,
        "engine_id": configuration.engine_id,
        "color_id": configuration.color_id,
        "wheel_id": configuration.wheel_id,
        "extra_ids": [extra.id for extra in configuration.extras]
    }