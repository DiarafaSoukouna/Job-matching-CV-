from contextlib import asynccontextmanager

from fastapi import FastAPI

from models import Account

from typing import Annotated

from fastapi import Depends, FastAPI, HTTPException, Query
from sqlmodel import Session, SQLModel, create_engine, select

database_url = "postgresql://test_db_user:kZvMBdDnQxLxOHSjtGztxEap2GHQ8tWJ@dpg-cviqgei4d50c73c4t2ag-a.virginia-postgres.render.com/test_db_tzs3"

engine = create_engine(database_url)

def drop_create_db_and_tables():
    ###Drop all tables
    SQLModel.metadata.drop_all(engine)

    ###Drop all tables
    SQLModel.metadata.create_all(engine)

    ddd = Account()
    
    # with Session(engine) as session:
    #     product1 = Product(name="Laptop", price=1200.0)
    #     service1 = Service(description="Web Development", duration=40)

    #     session.add(product1)
    #     session.add(service1)
    #     session.commit()

    #     products = session.query(Product).all()
    #     services = session.query(Service).all()

    #     print("Products:", products)
    #     print("Services:", services)

    #     items = session.query(BaseItem).all()
    #     for item in items:
    #         if isinstance(item, Product):
    #             print(f"Found Product: {item.name}, Price: {item.price}")
    #         elif isinstance(item, Service):
    #             print(f"Found Service: {item.description}, Duration: {item.duration}")
    #         else:
    #             print(f"Found BaseItem: {item.type}")

def get_session():
    with Session(engine) as session:
        yield session

SessionDep = Annotated[Session, Depends(get_session)]

###On startup/shutdow actions
@asynccontextmanager
async def lifespan(app: FastAPI):
    ###Actions to on startup
    drop_create_db_and_tables()
    yield

    ###Actions to on shutdown
    #Code...

app = FastAPI(lifespan=lifespan)


@app.get("/")
async def home():
    return "Hello world, ..."