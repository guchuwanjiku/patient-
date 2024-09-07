from sqlalchemy import Column, Integer, String, Float, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from .database import Base

class Drug(Base):
    __tablename__ = "drugs"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    description = Column(String)
    quantity = Column(Integer)
    price = Column(Float)

class Prescription(Base):
    __tablename__ = "prescriptions"

    id = Column(Integer, primary_key=True, index=True)
    patient_id = Column(String, index=True)
    drug_id = Column(Integer, ForeignKey("drugs.id"))
    dosage = Column(String)
    frequency = Column(String)
    prescribed_at = Column(DateTime)

    drug = relationship("Drug")