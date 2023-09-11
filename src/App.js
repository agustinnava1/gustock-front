import React, { useEffect, useState } from "react";
import { setToken } from "./helper/AxionHelper";

import Home from "./pages/HomePage";
import Login from "./pages/LoginPage";

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
          : <Login></Login>
      }
    </div>
  );
}

export default App;