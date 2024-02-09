from datetime import datetime
from fastapi import APIRouter, HTTPException, Depends
from api.utils.github import get_repo_data, get_repo_stargazers_history

router = APIRouter(
    prefix="/api/github",
    tags=["github"],
    # responses={404: {"description": "Not found"}},
)

@router.get("/{owner}/{repo_name}")
async def read_item(owner: str, repo_name: str):
    if owner is None or repo_name is None:
        raise HTTPException(status_code=404, detail="Repository not found")

    repo = get_repo_data(owner, repo_name)
    if repo is None:
        raise HTTPException(status_code=404, detail="Repository not found")
    return {
        'full_name': repo['full_name'],
        'name': repo['name'],
        'owner': repo['owner']['login'],
        "avatar_url": repo['owner']['avatar_url'],
        'description': repo['description'],
        'stargazers_count': repo['stargazers_count'],
        'html_url': repo['html_url'],
        'language': repo['language'],
    }


@router.get("/{owner}/{repo_name}/stargazers")
def read_stargazers(owner: str, repo_name: str):
    if owner is None or repo_name is None:
        raise HTTPException(status_code=404, detail="Repository not found")

    repo = get_repo_data(owner, repo_name)

    if repo is None:
        raise HTTPException(status_code=404, detail="Repository not found")

    data = get_repo_stargazers_history(owner, repo_name, repo)
    data.append({
        "date": datetime.now().strftime("%Y-%m-%d"),
        "count": repo['stargazers_count']
    })

    if repo is None:
        raise HTTPException(status_code=404, detail="Repository not found")

    return data
