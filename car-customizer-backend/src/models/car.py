from sqlalchemy.orm import Mapped
from sqlalchemy.orm import relationship
from sqlalchemy.orm import mapped_column
from sqlalchemy import String
from typing import List
from model import db

class Car(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(50))
    price: Mapped[int] = mapped_column()

    wheels: Mapped[List["Wheel"]] = relationship(back_populates="car")
    colors: Mapped[List["Color"]] = relationship(back_populates="car")
    engines: Mapped[List["Engine"]] = relationship(back_populates="car")
    extras: Mapped[List["Extra"]] = relationship(back_populates="car")


    def __repr__(self):
        return f"Car(id={self.id}, name={self.name}, price={self.price})"
    
    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'price': self.price
        }