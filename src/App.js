import React, { useEffect, useState } from "react";

import { Home } from "./pages/home.pagina";
import { Login } from "./pages/login.pagina";

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