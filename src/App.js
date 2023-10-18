import React, { useEffect, useState } from 'react'

import jwtDecode from 'jwt-decode'
import Cookies from 'universal-cookie'

import { Home } from './pages/home.pagina'
import { Login } from './pages/login.pagina'

import { UserProvider } from './user.context'

function App() {
  const cookies = new Cookies()
  const [user, setUser] = useState(null)

  useEffect(() => {
    const jwtToken = cookies.get('jwt_authorization')
    if (jwtToken) {
      const decoded = jwtDecode(jwtToken)
      setUser(decoded)
    }
  }, [setUser])

  const renderContent = () => {
    if (user) {
      return <Home />
    } else {
      return <Login />
    }
  }

  return (
    <UserProvider value={[user, setUser]}>
      {renderContent()}
    </UserProvider>
  );
}

export default App;