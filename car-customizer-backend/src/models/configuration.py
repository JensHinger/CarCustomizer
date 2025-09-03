from sqlalchemy.orm import Mapped
from sqlalchemy.orm import relationship
from sqlalchemy.orm import mapped_column
from sqlalchemy import String, ForeignKey
from model import db
from typing import List

class Configuration(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)

    # FK for configuration items
    car_id: Mapped[int] = mapped_column(ForeignKey("car.id"))
    engine_id: Mapped[int] = mapped_column(ForeignKey("engine.id"))
    color_id: Mapped[int] = mapped_column(ForeignKey("color.id"))
    wheel_id: Mapped[int] = mapped_column(ForeignKey("wheel.id"))
    
    # Relationships
    car: Mapped["Car"] = relationship(backref="configurations")
    engine: Mapped["Engine"] = relationship(backref="configurations")
    color: Mapped["Color"] = relationship(backref="configurations")
    wheel: Mapped["Wheel"] = relationship(backref="configurations")
    extras: Mapped[List["Extra"]] = relationship(secondary="configuration_extra", backref="configurations")

    def __repr__(self):
        return f"Configuration(id={self.id}, car_id={self.car_id}, engine_id={self.engine}, color_id={self.color_id}, wheel_id={self.wheel_id})"