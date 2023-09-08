import React from 'react'
import { Route,  BrowserRouter as Router, Routes } from 'react-router-dom';

//Components
import Login from '../components/login/Login';

export const AppRouter = () => { 

  return (
    <Router>
      <Routes>
        <Route  path='/' element={<Login />}/>
      </Routes>
    </Router>
  )
} 
