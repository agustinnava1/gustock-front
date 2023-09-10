import React from 'react'
import { Route,  BrowserRouter as Router, Routes } from 'react-router-dom';

//Pages
import App from '../App';
import Home from '../pages/Home';
//Components

export const AppRouter = () => { 
  return (
    <Router>
      <Routes>
        <Route  path='/' element={<Home />}/>
      </Routes>
    </Router>
  )
} 
