import React from 'react';
import { useState } from 'react';
import { Button } from 'primereact/button';

import jwt from 'jwt-decode';
import Cookies from 'universal-cookie';

import AuthService from '../services/auth.service';

function Login() {
  // Initialize Cookie
  const cookies = new Cookies();

  // Initialize user state
  const [user, setUser] = useState(null);

  const logout = () => {
    setUser(null);
    cookies.remove("jwt_authorization");
  }

  const [userDetail, setUserDetail] = useState({
    username: "",
    password: ""
  })

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetail({
      ...userDetail,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (userDetail.username === "" || userDetail.password === "") {
      return;
    }

    AuthService.login(userDetail).then((resp) => {
      // Decoded JWT Token
      const decoded = jwt(resp.data.token);

      // Set user state
      setUser(decoded.sub);

      // Set cookie
      cookies.set("jwt_authorization", resp.data.token, {
        expires: new Date(decoded.exp * 1000)
      })

    }).catch((error) => {
      console.log(error)
    })
  }

  return (
    <div className="form-signin text-center">
      <h1 className="fw-bold">GUSTOCK</h1>
      <h2 className="mb-5 fw-normal">Ingreso al sistema</h2>
      <form onSubmit={handleSubmit}>

        <div className="form-floating mb-3">
          <input name="username" type="text" className="form-control m-0" autoFocus
            value={userDetail.username} onChange={handleChange}></input>
          <label>Usuario</label>
        </div>

        <div className="form-floating mb-2">
          <input name="password" type="password" className="form-control m-0"
            value={userDetail.password} onChange={handleChange}></input>
          <label>Contraseña</label>
        </div>

        <Button label="Iniciar sesión" className="mt-3" type="submit"></Button>
      </form>
    </div>
  );
}

export default Login;