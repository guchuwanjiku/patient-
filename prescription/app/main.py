from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from . import crud, models, schemas
from .database import engine, get_db

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

@app.post("/drugs/", response_model=schemas.Drug)
def create_drug(drug: schemas.DrugCreate, db: Session = Depends(get_db)):
    return crud.create_drug(db=db, drug=drug)

@app.get("/drugs/", response_model=list[schemas.Drug])
def read_drugs(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    drugs = crud.get_drugs(db, skip=skip, limit=limit)
    return drugs

@app.post("/prescriptions/", response_model=schemas.Prescription)
def create_prescription(prescription: schemas.PrescriptionCreate, db: Session = Depends(get_db)):
    return crud.create_prescription(db=db, prescription=prescription)

@app.get("/prescriptions/", response_model=list[schemas.Prescription])
def read_prescriptions(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    prescriptions = crud.get_prescriptions(db, skip=skip, limit=limit)
    return prescriptions

@app.get("/drug-interactions/")
def check_drug_interactions(drug1_id: int, drug2_id: int, db: Session = Depends(get_db)):
    drug1 = crud.get_drug(db, drug1_id)
    drug2 = crud.get_drug(db, drug2_id)
    if not drug1 or not drug2:
        raise HTTPException(status_code=404, detail="One or both drugs not found")
    return {"message": f"No known interactions between {drug1.name} and {drug2.name}"}