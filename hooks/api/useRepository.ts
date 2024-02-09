import axios from 'axios';
import { useState } from 'react';

export const useRepository = () => {
  const [isLoading, setIsLoading] = useState(false);

  const getRepository = async (owner: string, repo_name: string) => {
    setIsLoading(true);
    return axios.get(`/api/github/${owner}/${repo_name}`).finally(() => {
      setIsLoading(false);
    });
  }
  return { getRepository, isLoading }
}