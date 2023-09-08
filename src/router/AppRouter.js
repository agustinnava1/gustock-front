import React from 'react'
import { Route,  BrowserRouter as Router, Routes } from 'react-router-dom';

//Pages
import Home from '../pages/Home';
//Components
import Login from '../components/login/Login';

export const AppRouter = () => { 

  return (
    <Router>
      <Routes>
        <Route  path='/' element={<Login />}/>
        <Route  path='/inicio' element={<Home />}/>
      </Routes>
    </Router>
  )
} 
