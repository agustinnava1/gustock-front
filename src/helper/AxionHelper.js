export let token = null;

export const BASE_URL = "http://localhost:8080";

export const config = '';

export const getConfig = () => {
  return {
    headers: {
      Authorization: token ? `Bearer ${token}` : null
    }
  };
};

export const setToken = (newToken) =>{
  token = 'Bearer ' + newToken
}


