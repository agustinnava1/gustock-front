
export let token = null;

export const BASE_URL = "http://localhost:8080";

export const config = {
  headers: {
      Authorization: token
  }
} 

export const setUser = user =>{
  localStorage.setItem('loggedUser', user)
}

export const setToken = newToken =>{
  token = 'Bearer ' + newToken
}


