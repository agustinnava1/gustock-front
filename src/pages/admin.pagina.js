import { useContext, useEffect, useState } from 'react'
import { Card } from 'primereact/card'
import { Link } from 'react-router-dom'
import { Button } from 'primereact/button'
import { Ban, Store, Warehouse, Wrench } from 'lucide-react'

import UserContext from '../user.context'
import ShopService from '../services/local.servicio'

export const AdminPagina = () => {
  const [user, setUser] = useContext(UserContext)
  const [sucursales, setSucursales] = useState([])

  useEffect(() => {
    ShopService.getAll().then(data => {
      setSucursales(data)
    })
  }, [])

  const shops = sucursales.filter(shop => shop.tipo === 'LOCAL');
  const depositos = sucursales.filter(deposito => deposito.tipo === 'DEPOSITO');

  return (
    <div className='lg:w-[1140px] m-auto px-5'>
      <div className="bg-blue-800 h-[140px] rounded-b-full 
      flex justify-center items-center flex-col text-center text-white">
        <h1 className="text-4xl !text-white">Bienvenido <span className="font-bold">{user.sub}</span></h1>
        <p className="text-xl mt-4">{user.rol.split('_')[1]}</p>
      </div>

      <div className='my-5'>
        <h2 className='text-2xl font-medium mb-5'>Locales</h2>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
          {shops.map(shop => (
            <Card className='!shadow-none border'>
              <div className='text-center'>
                <div className='bg-blue-500 rounded-md p-5'>
                  <Store className='text-white m-auto' size={80} />
                </div>
                <div className='bg-white px-5 my-3'>
                  <h3 className='text-blue-500 text-xl font-bold mb-2'>{shop.nombre}</h3>
                  <p className='font-medium text-gray-500'>{shop.direccion}</p>
                </div>
                <Link to={`/local/${shop.nombre}`}>
                  <Button label='Ingresar' size='small' />
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <div className='mb-5'>
        <h2 className='text-2xl font-medium mb-5'>Depósitos</h2>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
          {depositos.map(deposito => (
            <Card className='!shadow-none border'>
              <div className='text-center'>
                <div className='bg-sky-500 rounded-md p-5'>
                  <Warehouse className='text-white m-auto' size={80} />
                </div>
                <div className='bg-white px-5 my-3'>
                  <h3 className='text-sky-500 text-xl font-bold mb-2'>{deposito.nombre}</h3>
                  <p className='font-medium text-gray-500'>{deposito.direccion}</p>
                </div>
                <Link to={`/deposito/${deposito.nombre}`}>
                  <Button className='!bg-sky-500 !border-sky-500' label='Ingresar' size='small' />
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}