import os
import requests
from dotenv import load_dotenv, find_dotenv
from .counter import get_values_list_pages

import logging
import sys

logger = logging.getLogger(__name__)
logger.setLevel(logging.DEBUG)
logger.addHandler(logging.StreamHandler(sys.stdout))
logger.info('GitHub API is starting up')

_ = load_dotenv(find_dotenv())

GITHUB_TOKEN = os.environ['GITHUB_ACCESS_TOKEN']
GITHUB_API_URL = 'https://api.github.com'
GITHUB_API_HEADERS = {
    'Authorization': f'token {GITHUB_TOKEN}',
    'accept': 'application/vnd.github.v3.star+json'
}
PER_PAGE = 30


def get_organization_data(organization):
    url_api = f'{GITHUB_API_URL}/orgs/{organization}'
    response_api = requests.get(url_api, headers=GITHUB_API_HEADERS)

    if response_api.status_code != 200:
        return None

    return response_api.json()

def get_repo_star_history_per_page(owner, repo_name, page):
    url = f'https://api.github.com/repos/{owner}/{repo_name}/stargazers'
    params = { 'per_page': PER_PAGE, 'page': page }

    response_api = requests.get(url, params=params, headers=GITHUB_API_HEADERS)
    
    if response_api.status_code != 200:
        return None
    
    data = response_api.json()

    count = (page - 1) * PER_PAGE

    date = data[0]['starred_at']
    date = date[:10]

    return {'count': count, 'date': date}


def get_repo_data(owner, repo_name):
    url_api = f'{GITHUB_API_URL}/repos/{owner}/{repo_name}'
    response_api = requests.get(url_api, headers=GITHUB_API_HEADERS)

    if response_api.status_code != 200:
        return None

    return response_api.json()


def get_repo_stargazers_history(owner, repo_name, repository_data, iterations = 15):
    total_stargazers = repository_data['stargazers_count']
    list_pages = get_values_list_pages(total_stargazers, iterations)
    result = []

    for page in list_pages:
        stars_data = get_repo_star_history_per_page(owner, repo_name, page)
        result.append(stars_data)

    return result