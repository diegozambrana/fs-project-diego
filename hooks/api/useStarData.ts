import axios from 'axios';
import { useState } from 'react';
import { useCookiesForStarData } from '../store/useCookiesForStarData';

export const useRepositoryStarHistory = () => {
  const [isLoading, setIsLoading] = useState(false);
  const {getStarData, setStarData, verify} = useCookiesForStarData();

  /* 
  * Get the star history of a repository by the API,
  * if the data is already stored in the cookies,
  * it will return the data from the cookies.
  */
  const getRepositoryStarHistory = async (owner: string, repo_name: string) => {
    setIsLoading(true);
    const key = `${owner}_${repo_name}`;
    if(verify(key)){
      setIsLoading(false);
      return getStarData(key);
    }
    const response = await axios.get(`/api/github/${owner}/${repo_name}/stargazers`).finally(() => {
      setIsLoading(false);
    });
    setStarData(key, response.data);
    return response.data;
  }
  return { getRepositoryStarHistory, isLoading }
}