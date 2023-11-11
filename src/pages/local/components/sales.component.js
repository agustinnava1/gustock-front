import { Button } from 'primereact/button'
import { Card } from 'primereact/card'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const SalesComponent = ({ shop }) => {
  return (
    <div className='lg:flex lg:justify-between gap-5'>
      <div className='lg:w-1/6'>
        <Card className='!bg-blue-500 mb-5'>
          <span className='!text-white text-2xl font-medium'>Ventas</span>
        </Card>

        <Card className='!shadow-lg border-l-4 border-blue-600  mb-5'>
          <Link to={`/local/${shop}/venta/registrar`}>
            <Button label='Nueva venta' className='hover:!bg-blue-600 !rounded-full !mb-3 w-full' size='small' />
          </Link>
          <Link to={`/local/${shop}/devolucion/registrar`}>
            <Button label='Devolución' severity="secondary" className='w-full !rounded-full' size='small' />
          </Link>
        </Card>

        <Card className='!shadow-lg border-l-4 border-blue-800 mb-5'>
          <Button label='Abrir turno' className='hover:!bg-blue-600 !rounded-full !mb-3 w-full' size='small' />
          <Button label='Cerrar turno' severity="secondary" className='w-full !rounded-full' size='small' />
        </Card>

        <Card className='!shadow border'>

        </Card>
      </div>

      <div className='lg:w-5/6'>
        <Card className='!shadow border'>

        </Card>
      </div>
    </div>
  )
}

export default SalesComponent