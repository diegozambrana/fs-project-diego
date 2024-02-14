import logging
import sys

from fastapi import APIRouter, HTTPException

from api.utils.github import (
    get_repo_data,
    get_repo_stargazers_history,
    get_repo_stargazers_history_complete,
    get_organization_data,
    get_organization_stargazers_history_complete,
)
from api.utils.handlers import get_repo_format, get_organization_format
from api.utils.nixtla import forecast
from api.utils.pystats import get_downloads_data

logger = logging.getLogger(__name__)
logger.setLevel(logging.DEBUG)
logger.addHandler(logging.StreamHandler(sys.stdout))
logger.info('PyStats API is starting up')

router = APIRouter(
    prefix="/api/py",
    tags=["python packages"],
)


@router.get("/{package_name}")
async def get_package_data(package_name: str):
    """
    Get the data of a python package from pypi
    """
    if package_name is None:
        raise HTTPException(status_code=404, detail="Package not found")

    data = get_downloads_data(package_name)

    if data is None:
        raise HTTPException(status_code=404, detail="Package not found")

    prediction = forecast(data)

    return {
        'name': package_name,
        'data': data,
        'forecast': prediction,
    }