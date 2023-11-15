import { useContext, useEffect, useState } from 'react'

import { Save } from 'lucide-react'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import UserContext from '../user.context'
import UserService from '../services/usuario.servicio'

export const UsuarioPagina = () => {
  const [user, setUser] = useContext(UserContext)
  const [shop, setShop] = useState(null)

  useEffect(() => {
    UserService.getByName(user.sub).then(data => {
      setShop(data.shop)
    })
  }, [])

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="text-center">
        <div className="mb-5">
          <h2 className="text-4xl font-medium mb-5">Bienvenido de vuelta {user.sub}</h2>
          <span className="text-xl">Estas en el local {shop}</span>
        </div>
        <div className="flex gap-5">
          <Link to={`/local/${shop}/venta/registrar`}>
            <Card className="!shadow-xl rounded-xl bg-white text-center border">
              <div className='p-32'>
                <Save className="text-blue-500 m-auto mb-10" size={100} />
                <h2 className='text-2xl font-medium'>Registrar venta</h2>
              </div>
            </Card>
          </Link>
          <Link to={`/local/${shop}/devolucion/registrar`}>
            <Card className="!shadow-xl rounded-xl bg-white border">
              <div className='p-32'>
                <Save className="text-blue-500 m-auto mb-10" size={100} />
                <h2 className='text-2xl font-medium'>Registrar cambio</h2>
              </div>
            </Card>
          </Link>
        </div>
      </div >
    </div >
  )
}