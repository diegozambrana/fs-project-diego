import { getCookie, setCookie, removeCookie } from 'typescript-cookie';

const PREFIX = 'nxt__star_history__';

/* 
* This hook is used to store star data in cookies as JSON
* verify if the data is already stored based on the key and date
* format: 'nxt_starData_<owner>_<repo>'
* data_format: 
* {
*    date: '2021-08-01',
*    data: [ { date: '2021-08-01', count: 1000 }, ... ]
* }
*/
export const useCookiesForStarData = () => {
  const verify = (key: string) => {
    // Check if the data is already stored and if the date is the same
    let data: string | undefined = getCookie(PREFIX + key);
    if (data === undefined) {
      return false;
    }
    const dataParsed = JSON.parse(data);
    const currentDate = new Date().toISOString().split('T')[0];
    if(dataParsed['date'] !== currentDate){
      removeStarData(key)
      return false;
    }
    return true
  };

  const getStarData = (key: string) => {
    // Get the data from the cookie
    const data = getCookie(PREFIX + key)
    if (data === undefined) {
      return undefined;
    }
    return JSON.parse(data)['data'];
  };
  
  const setStarData = (key: string, value: object) => {
    // Set the data in the cookie
    const currentDate = new Date().toISOString().split('T')[0];
    const data = { date: currentDate, data: value };
    setCookie(PREFIX + key, JSON.stringify(data))
  };
  
  // Remove the data from the cookie
  const removeStarData = (key: string) => removeCookie(PREFIX + key);

  return { getStarData, setStarData, removeStarData, verify};
};
