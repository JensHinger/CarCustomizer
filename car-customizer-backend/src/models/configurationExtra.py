from sqlalchemy.orm import Mapped
from sqlalchemy.orm import mapped_column
from sqlalchemy import ForeignKey
from model import db

# Add this new table definition after your Configuration class
class ConfigurationExtra(db.Model):
 
    configuration_id: Mapped[int] = mapped_column(ForeignKey('configuration.id'), primary_key=True)
    extra_id: Mapped[int] = mapped_column(ForeignKey('extra.id'), primary_key=True)

    def __repr__(self):
        return f"ConfigurationExtra(configuration_id={self.configuration_id}, extra_id={self.extra_id})"