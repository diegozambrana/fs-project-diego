from fastapi import FastAPI
from api.routes import github

app = FastAPI()

app.include_router(github.router)