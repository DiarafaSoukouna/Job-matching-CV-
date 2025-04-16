from contextlib import asynccontextmanager

from fastapi import FastAPI, status, Form, UploadFile

from helpers.cv_matcher import extract_named_entities, match_cv_to_job
from models import AccountType, Account, BusinessCategory, CustomResponse, Job, JobCategory

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

    ###Create all tables
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

@app.get("/account/isUsernameExists/{username}")
def is_username_exists(username: str, session: SessionDep) -> bool:
        return get_account_by_identifier(value=username, session=session, raiseError=False) is not None

@app.get("/account/isEmailExists/{email}")
def is_email_exists(email: str, session: SessionDep) -> bool:
        return get_account_by_identifier(value=email, session=session, raiseError=False) is not None

@app.get("/account/isPhoneNumberExists/{phone_number}")
def is_phone_number_exists(phone_number: str, session: SessionDep) -> bool:
        return get_account_by_identifier(value=phone_number, session=session, raiseError=False) is not None
        
def checkIfAccountExists(username: str, email: str, phone_number: str, session: SessionDep):
    """
        Check if there is a account with this username or this email or this phone number
        
        If yes then raise an error else do nothing
    """
    status_code=status.HTTP_403_FORBIDDEN

    if is_username_exists(username=username, session=session):
        raise HTTPException(status_code=status_code, detail=accountExistsUsername)
    
    if is_email_exists(email=email, session=session):
        raise HTTPException(status_code=status_code, detail=accountExistsEmail)
    
    if is_phone_number_exists(phone_number=phone_number, session=session):
        raise HTTPException(status_code=status_code, detail=accountExistsPhoneNumber)

@app.post("/account/create")
def create_account(account: Account, session: SessionDep) -> CustomResponse:
    status_code=status.HTTP_403_FORBIDDEN

    if account.account_type not in [AccountType.ADMIN, AccountType.ENTREPRISE, AccountType.CANDIDATE]:
        raise HTTPException(status_code=status_code, detail=accountTypeError)
    
    checkIfAccountExists(
        username=account.username,
        email=account.email,
        phone_number=account.phone_number,
        session=session
    )

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
def get_account_by_identifier(value: str, session: SessionDep, isLogin: bool = False, raiseError: bool = True) -> Account | None:
    statement = select(Account).where(or_(Account.username == value, Account.email == value, Account.phone_number == value))

    try:
        return session.exec(statement).one()
    except Exception as e:

        if raiseError:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND if not isLogin else status.HTTP_401_UNAUTHORIZED,
                detail=accountNotFound if not isLogin else badCredentials
            )
        
        return None
    
@app.post("/account/login")
def login(usernameOrEmailOrPhone: Annotated[str, Form()], password: Annotated[str, Form()], session: SessionDep) -> Account:
    account = get_account_by_identifier(value=usernameOrEmailOrPhone, session=session, isLogin=True)

    isValidPassword = passwordHasher.verify(password=password, hash=account.password)

    if not isValidPassword:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail=badCredentials)

    return account

@app.get("/businessCategory/byName/{name}")
def get_business_category_by_name(name: str, session: SessionDep, raiseError: bool = True) -> BusinessCategory | None:
    statement = select(BusinessCategory).where(BusinessCategory.name == name)

    try:
        return session.exec(statement).one()
    except Exception as e:
        if raiseError:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=businessCategoryNotFound)
        
        return None

@app.post("/businessCategory/create")
def create_business_category(businessCategory: BusinessCategory, session: SessionDep) -> CustomResponse:

    existingBusinessCategory = get_business_category_by_name(name=businessCategory.name, session=session, raiseError=False)

    if existingBusinessCategory:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail=businessCategoryExists)

    session.add(businessCategory)
    session.commit()
    
    return CustomResponse(message=businessCategoryCreated)

@app.get("/businessCategory/all")
def get_all_business_categories(session: SessionDep) -> list[BusinessCategory]:
    statement = select(BusinessCategory)
    results = session.exec(statement)

    return results.all()

@app.get("/job/category/byName/{name}")
def get_job_category_by_name(name: str, session: SessionDep, raiseError: bool = True) -> JobCategory | None:
    statement = select(JobCategory).where(JobCategory.name == name)

    try:
        return session.exec(statement).one()
    except Exception as e:
        if raiseError:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=jobCategoryNotFound)
        
        return None

@app.post("/job/category/create")
def create_job_category(jobCategory: JobCategory, session: SessionDep) -> CustomResponse:
    existingJobCategory = get_job_category_by_name(name=jobCategory.name, session=session, raiseError=False)

    if existingJobCategory:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail=jobCategoryExists)

    session.add(jobCategory)
    session.commit()
    
    return CustomResponse(message=jobCategoryCreated)

@app.get("/job/category/all")
def get_all_job_categories(session: SessionDep) -> list[JobCategory]:
    statement = select(JobCategory)
    results = session.exec(statement)

    return results.all()

@app.post("/job/create")
def create_job(job: Job, session: SessionDep) -> CustomResponse:
    session.add(job)
    session.commit()
    
    return CustomResponse(message=jobCreated)

@app.get("/job/all")
def get_all_jobs(session: SessionDep) -> list[Job]:
    statement = select(Job)
    results = session.exec(statement)

    return results.all()

@app.post("/cv-match")
def cv_match(cv_file: UploadFile, job_description: Annotated[str, Form()]):
    try:
        score = match_cv_to_job(cv_file.file, job_description)
        return CustomResponse(message=f"Matching score: {score}%")
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))

@app.post("/extract-keywords")
def extract_keywords_from_text(text: Annotated[str, Form()]) -> CustomResponse:
    try:
        keywords = extract_named_entities(text)
        return CustomResponse(message=f"Keywords extracted: {', '.join(keywords)}")
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))

@app.get("/")
async def home():
    return "Hello world, ..."