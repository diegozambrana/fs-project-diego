import axios from 'axios';
import { useState } from 'react';

export const useRepository = () => {
  const [isLoading, setIsLoading] = useState(false);

  // get repository by owner and repo_name
  const getRepository = async (owner: string, repo_name: string) => {
    setIsLoading(true);
    return axios.get(`/api/github/${owner}/${repo_name}`).finally(() => {
      setIsLoading(false);
    });
  }

  // get repositories by a list of dictionary owner and repo_name
  const getRepositories = async (data: {owner: string, name: string}[]) => {
    setIsLoading(true);
    const query = data.map((d) => `${d.owner}/${d.name}`).join(',');
    return axios.get(`/api/github/get_repositories?query=${query}`)
      .then((response: any) => {
        return response.data; 
      }).finally(() => {
        setIsLoading(false);
      });
  }

  return {
    getRepository,
    getRepositories,
    isLoading
  }
}