import { useEffect, useState } from "react";
import { setUser } from "../helper/AxionHelper";

import { Button } from 'primereact/button';
import { Message } from 'primereact/message';
import { InputText } from 'primereact/inputtext';

import AuthService from '../services/auth.service';

export const Login = () => {
  useEffect(() => {
    const loggedUserJSON = localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
  }, [])

  const [errorMessage, setErrorMessage] = useState();

  const [userDetail, setUserDetail] = useState({
    username: "",
    password: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetail({
      ...userDetail,
      [name]: value
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (userDetail.username === "" || userDetail.password === "") {
      return;
    }

    AuthService.login(userDetail).then((resp) => {
      localStorage.setItem(
        'loggedUser', JSON.stringify(resp)
      )
    }).catch((error) => {
      setErrorMessage('Usuario o contraseña incorrecto');
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    })
  }

  return (
    <div className="h-screen" >
      <div className="grid grid-cols-1 md:grid-cols-2 bg-white">
        <div className="flex justify-center items-center">
          <div className="text-center p-40 shadow-md border rounded-lg">
            <h1 className="text-4xl font-semibold text-indigo-400 mb-5">GUSTOCK</h1>
            <h2 className="text-2xl mb-5">Ingreso al sistema</h2>

            <form onSubmit={handleLogin} className="text-center mb-5">
              <div>
                <label className="font-medium block mb-3">Usuario</label>
                <InputText name="username" type="text"
                  value={userDetail.username} onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md mb-3" />
              </div>

              <div className="mb-5">
                <label className="font-medium block my-3">Contraseña</label>
                <InputText name="password" type="password"
                  value={userDetail.password} onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md mb-3" />
              </div>

              <Button className="w-full" label="Iniciar sesión" type="submit" />
            </form >
            {errorMessage && <Message severity="error" text={errorMessage} />}
          </div>
        </div >

        <div className="hidden md:block">
          <img className="h-screen max-w-full"
            src='/local.jpg' />
        </div>
      </div>
    </div>
  )
}