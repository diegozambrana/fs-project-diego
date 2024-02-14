from fastapi import FastAPI
from api.routes import github
from api.routes import pystats

app = FastAPI()

app.include_router(github.router)
app.include_router(pystats.router)