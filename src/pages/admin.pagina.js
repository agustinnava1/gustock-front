import { Card } from 'primereact/card'
import { Link } from 'react-router-dom'
import { Button } from 'primereact/button'
import { useEffect, useState } from 'react'

import LocalServicio from '../services/local.servicio'

export const AdminPagina = () => {
  const [sucursales, setSucursales] = useState([]);

  useEffect(() => {
    LocalServicio.listar().then(data => {
      setSucursales(data)
    })
  }, [])

  const locales = sucursales.filter(local => local.tipo === 'LOCAL');
  const depositos = sucursales.filter(deposito => deposito.tipo === 'DEPOSITO');

  return (
    <div className='p-5'>
      <div>
        <h2 className='text-4xl font-medium mb-5 pb-3 border-b-2 border-[#415484]'>Mis Locales</h2>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5'>
          {locales.map(local => (
            <Card className='!rounded !shadow-none border text-center' key={local.id}>
              <div className='bg-blue-500 rounded-t py-5'>
                <i className='bi bi-shop text-white text-8xl'></i>
              </div>
              <div className='bg-white px-5 pt-5'>
                <h5 className='mb-2 text-2xl font-bold text-blue-900'>{local.nombre}</h5>
                <p className='mb-3 font-normal text-gray-700 dark:text-gray-400'>{local.direccion}</p>
                <Link to={`/local/${local.nombre}`}>
                  <Button label='Ingresar' size='small' className='hover:!bg-blue-600 w-1/2' />
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <div>
        <h2 className='text-4xl font-medium my-5 pb-3 border-b-2 border-[#415484]'>Mis Depósitos</h2>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5'>
          {depositos.map(deposito => (
            <Card className='!rounded !shadow-none border text-center' key={deposito.id}>
              <div className='bg-sky-500 rounded-t py-5'>
                <i className='bi bi-shop-window text-white text-8xl'></i>
              </div>
              <div className='bg-white px-5 pt-5'>
                <h5 className='mb-2 text-2xl font-bold text-sky-900'>{deposito.nombre}</h5>
                <p className='mb-3 font-normal text-gray-700 dark:text-gray-400'>{deposito.direccion}</p>
                <Link to={`/deposito/${deposito.nombre}`}>
                  <Button label='Ingresar' size='small' className='!bg-sky-500 !border-sky-500 hover:!bg-sky-600 w-1/2' />
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}