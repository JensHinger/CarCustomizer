from models import Configuration
from models import Order
from model import db

def insert_order(configuration_id: int):
    order = Order(
        configuration_id=configuration_id
    )
    db.session.add(order)
    db.session.flush()
    return order.id