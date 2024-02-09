import axios from 'axios';

export const getRepository = async (owner: string, repo_name: string) => {
  return axios.get(`/api/github/${owner}/${repo_name}`);
}

export const useGetStargazers = async (owner: string, repo_name: string) => {
  return axios.get(`/api/github/${owner}/${repo_name}/stargazers`);
}