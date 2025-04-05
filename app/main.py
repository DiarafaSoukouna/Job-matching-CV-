from contextlib import asynccontextmanager

from fastapi import FastAPI, status, Form

from models import AccountType, Account, Admin, Candidate, Entreprise, CustomResponse

from typing import Annotated

from fastapi import Depends, FastAPI, HTTPException
from sqlmodel import Session, SQLModel, create_engine, or_, select

from helpers.messages import *
from helpers.password_hasher import PasswordHasher

database_url = "postgresql://test_db_user:kZvMBdDnQxLxOHSjtGztxEap2GHQ8tWJ@dpg-cviqgei4d50c73c4t2ag-a.virginia-postgres.render.com/test_db_tzs3"

engine = create_engine(database_url)

passwordHasher = PasswordHasher()

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

def checkIfAccountExists(username: str, email: str, phone_number: str):
    """
        Check if there is a account with this username or this email or this phone number
        
        If yes then raise an error else do nothing
    """
    pass

@app.post("/account/create")
def create_account(account: Account, session: SessionDep) -> CustomResponse:
    status_code=status.HTTP_403_FORBIDDEN

    if account.account_type not in [AccountType.ADMIN, AccountType.ENTREPRISE, AccountType.CANDIDATE]:
        raise HTTPException(status_code=status_code, detail=accountTypeError)
    
    checkIfAccountExists(account.username, account.email, account.phone_number)

    password = account.password
    if password:
        account.password = passwordHasher.hash(password)

    session.add(account)
    session.commit()

    return CustomResponse(message=accountCreated)
    
@app.get("/account/all")
def get_all_accounts(session: SessionDep) -> list[Account]:
    statement = select(Account)
    results = session.exec(statement)

    return results.all()

@app.get("/account/byUsernameOrEmailOrPhone/{value}")
def get_account_by_identifier(value: str, session: SessionDep, isLogin: bool = False) -> Account:
    statement = select(Account).where(or_(Account.username == value, Account.email == value, Account.phone_number == value))

    try:
        return session.exec(statement).one()
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND if not isLogin else status.HTTP_401_UNAUTHORIZED,
            detail=accountNotFound if not isLogin else badCredentials
        )
    
@app.post("/account/login")
def login(usernameOrEmailOrPhone: Annotated[str, Form()], password: Annotated[str, Form()], session: SessionDep) -> Account:
    account = get_account_by_identifier(value=usernameOrEmailOrPhone, session=session, isLogin=True)

    isValidPassword = passwordHasher.verify(password=password, hash=account.password)

    if not isValidPassword:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail=badCredentials)

    return account

@app.get("/")
async def home():
    return "Hello world, ..."