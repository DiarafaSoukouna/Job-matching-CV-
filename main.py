from contextlib import asynccontextmanager

from fastapi import FastAPI, Response, status

from models import Account, Admin, Candidate, Entreprise, CustomResponse

from typing import Annotated, Any

from fastapi import Depends, FastAPI, HTTPException, Query
from sqlmodel import Session, SQLModel, create_engine, select

database_url = "postgresql://test_db_user:kZvMBdDnQxLxOHSjtGztxEap2GHQ8tWJ@dpg-cviqgei4d50c73c4t2ag-a.virginia-postgres.render.com/test_db_tzs3"

engine = create_engine(database_url)

def drop_create_db_and_tables():
    ###Drop all tables
    SQLModel.metadata.drop_all(engine)

    ###Drop all tables
    SQLModel.metadata.create_all(engine)

###On startup/shutdow actions
@asynccontextmanager
async def lifespan(_: FastAPI):
    ###Actions to on startup
    drop_create_db_and_tables()
    yield

    ###Actions to on shutdown
    #Code...

app = FastAPI(lifespan=lifespan)


def get_session():
    with Session(engine) as session:
        yield session

SessionDep = Annotated[Session, Depends(get_session)]

@app.post("/account/create")
def create_account(account: Account, session: SessionDep, response: Response) -> CustomResponse:
    try:
        session.add(account)
        session.commit()

        return CustomResponse(message="Account created successfully....")
    except:
        response.status_code = status.HTTP_403_FORBIDDEN
        return CustomResponse(message="Error occured....")


@app.get("/")
async def home():
    return "Hello world, ..."