from sqlalchemy.orm import Session
from . import models, schemas
from datetime import datetime

def get_drug(db: Session, drug_id: int):
    return db.query(models.Drug).filter(models.Drug.id == drug_id).first()

def get_drugs(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Drug).offset(skip).limit(limit).all()

def create_drug(db: Session, drug: schemas.DrugCreate):
    db_drug = models.Drug(**drug.dict())
    db.add(db_drug)
    db.commit()
    db.refresh(db_drug)
    return db_drug

def get_prescription(db: Session, prescription_id: int):
    return db.query(models.Prescription).filter(models.Prescription.id == prescription_id).first()

def get_prescriptions(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Prescription).offset(skip).limit(limit).all()

def create_prescription(db: Session, prescription: schemas.PrescriptionCreate):
    db_prescription = models.Prescription(**prescription.dict(), prescribed_at=datetime.now())
    db.add(db_prescription)
    db.commit()
    db.refresh(db_prescription)
    return db_prescription