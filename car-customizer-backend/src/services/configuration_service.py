from models import Configuration
from models import Order
from models import Extra
from model import db
from services.order_service import insert_order
from typing import List
import os

def _find_matching_configuration(
        car_id: int, 
        engine_id: int, 
        color_id: int,  
        wheel_id: int, 
        extras: List[int]) -> Configuration | None:
    # Check if configuration already exists
    sorted_extras = sorted(extras)

    # Check if configuration already exists
    existing_config = db.session.execute(
        db.select(Configuration)
        .where(Configuration.car_id == car_id)
        .where(Configuration.engine_id == engine_id)
        .where(Configuration.color_id == color_id)
        .where(Configuration.wheel_id == wheel_id)
    ).scalars().all()
    print(sorted_extras)
    for config in existing_config:
        print(config)
        print(config.extras)

    # Compare extras for matching configurations
    for config in existing_config:
        config_extras = sorted([extra.id for extra in config.extras])
        if config_extras == sorted_extras:
            return config
        
    return None

def _create_configuration(
        car_id: int,
        engine_id: int,
        color_id: int,
        wheel_id: int,
        extras: List[int]) -> Configuration:
    new_config = Configuration(
        car_id=car_id,
        engine_id=engine_id,
        color_id=color_id,
        wheel_id=wheel_id
    )
    
    db.session.add(new_config)

    if extras:
        extra_objects = Extra.query.filter(Extra.id.in_(extras)).all()
        new_config.extras.extend(extra_objects)

    db.session.flush()
    return new_config

def insert_configuration(
        car_id: int,
        engine_id: int,
        color_id: int,
        wheel_id: int,
        extras: List[int],
        action: str
):
    # Maybe make this an Error
    if len(extras) > 5:
        return {"error": "Only five extras allowed"}
    
    config = _find_matching_configuration(car_id, engine_id, color_id, wheel_id, extras)
    if not config:
        config = _create_configuration(car_id, engine_id, color_id, wheel_id, extras)

    config_url = f"{os.environ["URL"]}/{car_id}?config_id={config.id}"
  
    response = {"configuration_url": config_url}

    if action == "place-order":
        order_id = insert_order(config.id)
        response["order_id"] = order_id

    db.session.commit()

    return response

def get_configuration_by_id(config_id: int):
    configuration = db.session.execute(db.select(Configuration).where(Configuration.id == config_id)).scalar()
    return configuration
