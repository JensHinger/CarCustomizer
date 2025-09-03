from sqlalchemy.orm import Mapped
from sqlalchemy.orm import relationship
from sqlalchemy.orm import mapped_column
from sqlalchemy import String
from model import db

class Configuration(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)
    configuration_url: Mapped[str] = mapped_column(String(100))

    # FK for configuration items

    def __repr__(self):
        return f"Configuration(id={self.id}, name={self.configuration_url})"