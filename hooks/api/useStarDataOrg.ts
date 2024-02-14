import axios from 'axios';
import { useState } from 'react';
import { useLocalStorageForStarData } from '../store/useLocalStorage';

export const useStarDataOrg = () => {
    const [isLoading, setIsLoading] = useState(false);
    const {getStarData, setStarData, verify} = useLocalStorageForStarData();
  
    /* 
    * Get the star history of a organization by the API,
    * if the data is already stored in the cookies,
    * it will return the data from the cookies.
    */
    const getOrganizationStarHistory = async (orgName: string) => {
      setIsLoading(true);
      const key = `org__${orgName}`;
      if(verify(key)){
        setIsLoading(false);
        return getStarData(key);
      }
      const response = await axios.get(`/api/github/org/${orgName}/stargazers`).finally(() => {
        setIsLoading(false);
      });
      setStarData(key, response.data);
      return response.data;
    }
    return { getOrganizationStarHistory, isLoading }
};