def get_repo_format(response):
    return {
        'full_name': response['full_name'],
        'name': response['name'],
        'owner': response['owner']['login'],
        "avatar_url": response['owner']['avatar_url'],
        'description': response['description'],
        'stargazers_count': response['stargazers_count'],
        'html_url': response['html_url'],
        'language': response['language'],
    }

def get_organization_format(response):
    return {
        'login': response['login'],
        'name': response['name'],
        'avatar_url': response['avatar_url'],
        'html_url': response['html_url'],
        'description': response['description'],
        'created_at': response['created_at'],
        'public_repos': response['public_repos'],
    }