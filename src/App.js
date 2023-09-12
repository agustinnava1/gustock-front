import React, { useEffect, useState } from "react";

import { Home } from "./pages/home.page";
import { Login } from "./pages/login.page";

function App() {
  const user = localStorage.getItem('loggedUser')

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