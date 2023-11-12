import { Button } from 'primereact/button'
import { Card } from 'primereact/card'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const SalesComponent = ({ shop }) => {
  return (
    <div className='lg:flex lg:justify-between gap-5'>
      <div className='lg:w-1/6'>
        <Card className='!shadow-none !bg-blue-800 mb-5'>
          <span className='!text-white text-2xl font-medium'>Ventas</span>
        </Card>
        <Card className='!shadow-none border border-l-4 border-l-blue-400 mb-5'>
          <p className='text-blue-400 font-medium mb-2'>Total efectivo</p>
          <span className='text-2xl'>$ 0</span>
        </Card>
        <Card className='!shadow-none border border-l-4 border-l-blue-500 mb-5'>
          <p className='text-blue-500 font-medium mb-2'>Total débito</p>
          <span className='text-2xl'>$ 0</span>
        </Card>
        <Card className='!shadow-none border border-l-4 border-l-blue-600 mb-5'>
          <p className='text-blue-600 font-medium mb-2'>Total código Qr</p>
          <span className='text-2xl'>$ 0</span>
        </Card>
        <Card className='!shadow-none border border-l-4 border-l-blue-700 mb-5'>
          <p className='text-blue-700 font-medium mb-2'>Total crédito</p>
          <span className='text-2xl'>$ 0</span>
        </Card>
        <Card className='!shadow-none border border-l-4 border-l-blue-800'>
          <p className='text-blue-800 font-medium mb-2'>Total de ventas</p>
          <span className='text-2xl'>$ 0</span>
        </Card>
      </div>

      <div className='lg:w-5/6'>
        <div className='flex gap-5 mb-5'>
          <Card className='!shadow-none border'>
            <div className='flex gap-3'>
              <Link to={`/local/${shop}/venta/registrar`}>
                <Button label='Nueva venta' className='w-full' size='small' />
              </Link>
              <Link to={`/local/${shop}/devolucion/registrar`}>
                <Button label='Devolución' severity="secondary" className='w-full' size='small' />
              </Link>
            </div>
          </Card>

          <Card className='!shadow-none border'>
            <div className='flex gap-3'>
              <div>
                <Button label='Abrir turno' className='w-full' size='small' />
              </div>
              <div>
                <Button label='Cerrar turno' severity="secondary" className='w-full' size='small' />
              </div>
            </div>
          </Card>
        </div>

        <Card className='!shadow-none border'>

        </Card>
      </div>
    </div>
  )
}

export default SalesComponent