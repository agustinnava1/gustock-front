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
    <div className="min-h-screen flex items-center justify-center bg-gray-100" >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-7xl p-4 bg-white shadow-lg rounded-lg">
        <div className="flex flex-col justify-center items-center">
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
        </div >

        <div className="hidden md:flex">
          <img className="max-w-full"
            src="https://scontent.fepa14-1.fna.fbcdn.net/v/t39.30808-6/300785795_630035965347940_3805356491541379238_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=a2f6c7&_nc_eui2=AeHO8l0ulJAACKgYJ3uegHzF28Utcy80ogjbxS1zLzSiCOmMh9XzQAZ1SyMclzRQPTz7Rge_lmTo2GJD3_uJ7Miy&_nc_ohc=R_t7s3LAAVIAX_bsmPN&_nc_ht=scontent.fepa14-1.fna&oh=00_AfAFfBW1lP-K97sOAJ8iRjc8BX1iU3-oOFb4Cw0joBS5Yg&oe=6502BA62" />
        </div>
      </div>
    </div>
  )
}