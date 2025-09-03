from sqlalchemy.orm import Mapped
from sqlalchemy.orm import relationship
from sqlalchemy.orm import mapped_column
from sqlalchemy import String, ForeignKey
from model import db

class Order(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)
    configuration_id: Mapped[int] = mapped_column(ForeignKey("configuration.id"))
    
    # Relationship
    configuration = relationship("Configuration", backref="orders")

    def __repr__(self):
        return f"Order(id={self.id})"