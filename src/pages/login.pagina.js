import { useContext, useState } from 'react'

import { Button } from 'primereact/button'
import { Message } from 'primereact/message'
import { Password } from 'primereact/password'
import { InputText } from 'primereact/inputtext'

import jwtDecode from 'jwt-decode'

import UserContext from '../user.context'
import setCookie from '../hooks/set.cookie'
import AuthService from '../services/auth.service'

export const Login = () => {
  const [user, setUser] = useContext(UserContext);
  const [errorMessage, setErrorMessage] = useState();

  const [userDetail, setUserDetail] = useState({
    username: '',
    password: ''
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
    if (userDetail.username === '' || userDetail.password === '') {
      return;
    }

    AuthService.login(userDetail).then((resp) => {
      const decoded = jwtDecode(resp.token)
      setCookie('jwt_authorization', resp.token)
      setUser(decoded)
    }).catch((error) => {
      setErrorMessage('Usuario o contraseña incorrecto')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    })
  }

  return (
    <div className='bg-no-repeat bg-cover bg-center relative' style={{ backgroundImage: 'url("/local.jpg")' }}>
      <div className='absolute md:bg-gradient-to-b from-blue-600 to-blue-200 opacity-75 inset-0 z-0'></div>
      <div className='min-h-screen sm:flex sm:flex-row mx-0 justify-center'>
        <div className='flex-col flex self-center p-10 sm:max-w-5xl xl:max-w-2xl z-10'>
          <div className='self-start hidden lg:flex flex-col text-white'>
            <h1 className='!text-white mb-3 font-bold text-5xl'>Bienvenido a gustock </h1>
            <p className='pr-3'>¡Bienvenido al equipo! Nuestra aplicación te ayudará en la gestión de el local.</p>
          </div>
        </div>
        <div className='flex justify-center self-center z-10'>
          <div className='p-12 bg-white mx-auto rounded-2xl w-100'>
            <div className='mb-4'>
              <h3 className='font-semibold text-2xl !text-[#1764C6]'>Inicia sesión </h3>
              <p className='text-gray-500'>Ingresá tus credenciales.</p>
            </div>
            <form onSubmit={handleLogin}>
              <div className='space-y-5'>
                <div className='space-y-2'>
                  <label className='block font-medium text-gray-700 tracking-wide'>Usuario</label>
                  <InputText name='username' type='text'
                    value={userDetail.username} onChange={handleChange}
                    className='w-full p-inputtext-sm' />
                </div>
                <div className='space-y-2'>
                  <label className='block font-medium text-gray-700 tracking-wide'>Contraseña</label>
                  <Password name='password' type='password' feedback={false}
                    value={userDetail.password} onChange={handleChange} toggleMask
                    className='w-full' inputClassName='w-full p-inputtext-sm' />
                </div>
                <div>
                  <Button className='w-full' label='Iniciar sesión' type='submit' />
                </div>
              </div>
            </form>
            {errorMessage && <Message className='!mt-5' severity='error' text={errorMessage} />}
          </div>
        </div>
      </div>
    </div>
  )
}