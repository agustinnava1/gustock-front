import { useContext, useState } from "react"

import { Button } from 'primereact/button'
import { Message } from 'primereact/message'
import { InputText } from 'primereact/inputtext'

import jwtDecode from 'jwt-decode'
import Cookies from 'universal-cookie'

import UserContext from "../user.context"
import AuthService from '../services/auth.service'
import { useNavigate } from "react-router-dom"

export const Login = () => {
  const cookies = new Cookies()
  const navigate = useNavigate();
  
  const [ user, setUser ] = useContext(UserContext);
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
      const decoded = jwtDecode(resp.token);
      cookies.set('jwt_authorization', resp.token, {
        expires: new Date(decoded.exp * 1000),
      })
      setUser(decoded)
    }).catch((error) => {
      setErrorMessage('Usuario o contraseña incorrecto')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    })
  }

  return (
    <div className="h-screen" >
      <div className="md:flex bg-white">

        <div className="bg-[#1764C6] md:w-1/2 flex justify-center items-center p-5 lg:p-0">
          <div className="bg-white text-center p-32 shadow-md border rounded-lg">
            <h1 className="text-4xl !text-[#1764C6] font-semibold mb-5">GUSTOCK</h1>
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

              <Button className="w-full hover:!bg-blue-600" label="Iniciar sesión" type="submit" />
            </form >
            {errorMessage && <Message severity="error" text={errorMessage} />}
          </div>
        </div >

        <div className="hidden md:block w-1/2">
          <img className="h-screen max-w-full"
            src='/local.jpg' />
        </div>

      </div>
    </div>
  )
}