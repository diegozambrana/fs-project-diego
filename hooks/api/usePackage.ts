import axios from 'axios';
import { useState } from 'react';
import { useLocalStorageForStarData } from '../store/useLocalStorage';
import { notifications } from '@mantine/notifications';
import { API_DOMAIN } from '@/utils/constants';


export const usePackage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const {getStarData, setStarData, verify} = useLocalStorageForStarData();

  // get package by package name
  const getPackage = async ( packageName: string) => {
    setIsLoading(true);
    const key = `${packageName}___package`;
    if(verify(key)){
      setIsLoading(false);
      return getStarData(key);
    }
    let response
    try{
      response = await axios.get(`${API_DOMAIN}/api/py/${packageName}`).finally(() => {
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

  // get packages by a list of package names
  const getPackages = async (data: string[]) => {
    setIsLoading(true);
    const query = data.join(',');
    return axios.get(`${API_DOMAIN}/api/py/packages?query=${query}`)
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