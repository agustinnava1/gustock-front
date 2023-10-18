import React, { useContext, useEffect, useState } from 'react'

import jwtDecode from 'jwt-decode'

import { Home } from './pages/home.pagina'
import { Login } from './pages/login.pagina'
import UserContext from '../src/user.context'
import getCookie from '../src/hooks/get.cookie'


function App() {
  const [user, setUser] = useContext(UserContext);

  useEffect(() => {
    const jwtToken = getCookie('jwt_authorization');
    if (jwtToken) {
      const decoded = jwtDecode(jwtToken);
      setUser(decoded);
    } else {
      setUser(null)
    }
  }, [])

  console.log("user:" + user)
  return (
    <div>
      {user ?
        <Home />
        :
        <Login />
      }
    </div>
  );
}

export default App;