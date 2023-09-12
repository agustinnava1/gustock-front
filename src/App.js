import React, { useEffect, useState } from "react";
import { setToken } from "./helper/AxionHelper";

import { Home } from "./pages/home.page";
import { Login } from "./pages/login.page";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedUserJSON = localStorage.getItem('loggedUser')
    if(loggedUserJSON){
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      setToken(user)
    }
  }, [])

  const handleLogout = () => {
    setUser(null)
    setToken(null)
    localStorage.removeItem('loggedUser')
  }

  return (
    <div>
      {user
          ? <Home></Home>
          : <Home></Home>
      }
    </div>
  );
}

export default App;