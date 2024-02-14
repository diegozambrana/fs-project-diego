import axios from 'axios';
import { useState } from 'react';
import { useLocalStorageForStarData } from '../store/useLocalStorage';
import { notifications } from '@mantine/notifications';


export const usePackage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const {getStarData, setStarData, verify} = useLocalStorageForStarData();

  // get repository by owner and repo_name
  const getPackage = async ( packageName: string) => {
    setIsLoading(true);
    const key = `${packageName}___package`;
    if(verify(key)){
      setIsLoading(false);
      return getStarData(key);
    }
    let response
    try{
      response = await axios.get(`/api/py/${packageName}`).finally(() => {
        setIsLoading(false);
      });
    }catch(err){
      notifications.show({
        title: 'Error',
        message: 'Package not found',
        color: 'red',
      })
      return null;
    }

    setStarData(key, response.data);
    
    return response.data;
  }

  // get repositories by a list of dictionary owner and repo_name
  const getPackages = async (data: string[]) => {
    setIsLoading(true);
    const query = data.join(',');
    return axios.get(`/api/py/packages?query=${query}`)
      .then((response: any) => {
        return response.data; 
      }).finally(() => {
        setIsLoading(false);
      });
  }

  return {
    getPackage,
    getPackages,
    isLoading
  }
}