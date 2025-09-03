from sqlalchemy.orm import Mapped
from sqlalchemy.orm import relationship
from sqlalchemy.orm import mapped_column
from model import db

class Order(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)

    # FK for configuration

    def __repr__(self):
        return f"Configuration(id={self.id}, name={self.configuration_url})"
    