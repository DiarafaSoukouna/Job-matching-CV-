from sqlmodel import Field, Relationship, SQLModel
from typing import Any, ClassVar
from enum import Enum
from datetime import datetime

from pydantic import BaseModel

from helpers.messages import *

class AccountType(str, Enum):
    ADMIN = "ADMIN"
    ENTREPRISE = "ENTREPRISE"
    CANDIDATE = "CANDIDATE"

class CustomResponse(BaseModel):
    message: str
    additional_data: Any | None = None


class AccountBase(SQLModel, table=False):
    id: int = Field(primary_key=True, nullable=False)

    account_type: AccountType = Field(nullable=False)

    enabled: ClassVar[bool] = Field(nullable=False, default=True)

    deleted: ClassVar[bool] = Field(nullable=False, default=False)

    full_name: str = Field(index=True)

    username: str | None = Field(unique=True, nullable=False, index=True)

    email: str = Field(unique=True, nullable=False, index=True)

    phone_number: str | None = Field(unique=True, default=None, index=True)

    address: str | None = Field(default=None)

    create_date: ClassVar[datetime] = Field(nullable=False, default=datetime.now())

class BusinessCategory(SQLModel, table=True):
    __tablename__="business_category"
    id: int = Field(primary_key=True, nullable=False)
    name: str = Field(nullable=False, unique=True)
    description: str | None = Field(default=None)
    
    accounts: list["Account"] | None = Relationship(back_populates="business_category")
    
class Account(AccountBase, table=True):
    __tablename__="account"
    password: str | None = Field(default=None, exclude=True)
    cv_file_path: str | None = Field(default=None)
    profile_image_path: str | None = Field(default=None)
    nif: str | None = Field(default=None)
    rc: str | None = Field(default=None)
    create_year: int | None = Field(default=None)
    about: str | None = Field(default=None)
    website: str | None = Field(default=None)

    jobs: list["Job"] | None = Relationship(back_populates="account")

    job_applications: list["JobApplication"] | None = Relationship(back_populates="account")

    business_category_id: int | None = Field(default=None, foreign_key="business_category.id")
    business_category: BusinessCategory | None = Relationship(back_populates="accounts")

class Admin(AccountBase, table=False):
    pass

class Entreprise(AccountBase, table=False):
    profile_image_path: str | None
    nif: str | None = None
    rc: str | None = None
    create_year: int | None = None
    about: str | None = None
    website: str | None = None
    
    jobs: list["Job"] | None = None
    business_category_id: int | None = None
    business_category: BusinessCategory | None = None

class Candidate(AccountBase, table=False):
    cv_file_path: str | None = None

class JobCategory(SQLModel, table=True):
    __tablename__="job_category"
    id: int = Field(primary_key=True, nullable=False)
    name: str = Field(nullable=False, unique=True)
    description: str | None = Field(default=None)

    jobs: list["Job"] = Relationship(back_populates="category")

class JobContractType(str, Enum):
    FULLTIME = "Full-Time"
    REMOTE = "Remote"
    PART_TIME = "Part-time"
    INTERNSHIP = "Internship"

class Job(SQLModel, table=True):
    __tablename__="job"
    id: int = Field(primary_key=True, nullable=False)
    title: str = Field(nullable=False)
    contract_type: JobContractType = Field(nullable=False)
    description: str | None = Field(nullable=False)
    skills: str | None = Field(default=None)

    category_id: int | None = Field(default=None, foreign_key="job_category.id")
    category: JobCategory | None = Relationship(back_populates="jobs")

    account_id: int | None = Field(default=None, foreign_key="account.id")
    account: Account | None = Relationship(back_populates="jobs")

    job_applications: list["JobApplication"] | None = Relationship(back_populates="job")

class JobApplication(SQLModel, table=True):
    __tablename__="job_application"
    id: int = Field(primary_key=True, nullable=False)
    apply_date: ClassVar[datetime] = Field(nullable=False, default=datetime.now())
    matching_rate: float | None = Field(nullable=False)

    account_id: int | None = Field(default=None, foreign_key="account.id")
    account: Account | None = Relationship(back_populates="job_applications")

    job_id: int | None = Field(default=None, foreign_key="job.id")
    job: Job | None = Relationship(back_populates="job_applications")