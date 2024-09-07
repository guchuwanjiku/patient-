from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class DrugBase(BaseModel):
    name: str
    description: str
    quantity: int
    price: float

class DrugCreate(DrugBase):
    pass

class Drug(DrugBase):
    id: int

    class Config:
        orm_mode = True

class PrescriptionBase(BaseModel):
    patient_id: str
    drug_id: int
    dosage: str
    frequency: str

class PrescriptionCreate(PrescriptionBase):
    pass

class Prescription(PrescriptionBase):
    id: int
    prescribed_at: datetime
    drug: Drug

    class Config:
        orm_mode = True