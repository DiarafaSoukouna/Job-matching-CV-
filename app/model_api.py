from fastapi import FastAPI, HTTPException, Depends, status
from sqlmodel import Session, SQLModel, create_engine
from typing import Annotated
from helpers.cv_matcher import match_cv_to_job, extract_named_entities
from contextlib import asynccontextmanager

# Déclaration de la base de données et du moteur SQL
database_url = "postgresql://test_db_user:kZvMBdDnQxLxOHSjtGztxEap2GHQ8tWJ@dpg-cviqgei4d50c73c4t2ag-a.virginia-postgres.render.com/test_db_tzs3"
engine = create_engine(database_url)

# Modèle de session
def get_session():
    with Session(engine) as session:
        yield session

SessionDep = Annotated[Session, Depends(get_session)]

# Modèle de données
class CustomResponse(SQLModel):
    message: str

# Initialisation de FastAPI avec gestion du cycle de vie
@asynccontextmanager
async def lifespan(_: FastAPI):
    yield
    # Actions lors de la fermeture de l'application, si nécessaire.

app = FastAPI(lifespan=lifespan)

# Exemple d'une route pour le matching CV-job
@app.post("/cv-match")
def cv_match(cv_file_path: str, job_description: str, session: SessionDep) -> CustomResponse:
    try:
        score = match_cv_to_job(cv_file_path, job_description)
        return CustomResponse(message=f"Matching score: {score}%")
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))

# Exemple d'une route pour l'extraction des mots-clés
@app.post("/extract-keywords")
def extract_keywords_from_text(text: str, session: SessionDep) -> CustomResponse:
    try:
        keywords = extract_named_entities(text)
        return CustomResponse(message=f"Keywords extracted: {', '.join(keywords)}")
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))
