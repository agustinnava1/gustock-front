import { useState } from 'react'

import { Card } from 'primereact/card'

import { Bookmark, Briefcase, Store, Tag, User } from 'lucide-react'
import { ProveedorComponent } from './components/provider.component'

export const PanelPagina = () => {
  const [component, setComponent] = useState('Proveedores')

  const componentMap = {
    Proveedores: <ProveedorComponent />,
    Rubros: <div>Rubros</div>,
    Marcas: <div>Marcas</div>,
    Usuarios: <div>Usuarios</div>,
    Sucursales: <div>Sucursales</div>,
  }

  const renderedComponent = componentMap[component] || null;

  return (
    <div className='m-5'>
      <h2 className="text-4xl font-medium mb-5">Registros del sistema</h2>

      <div className='flex gap-5'>
        <div className='lg:w-1/6'>
          <Card className='!shadow-none border mb-5 cursor-pointer'
            onClick={() => setComponent('Proveedores')}>
            <div className='flex gap-3'>
              <Briefcase className='text-blue-500' />
              <span className='font-medium'>Proveedores</span>
            </div>
          </Card>
          <Card className='!shadow-none border mb-5 cursor-pointer'
            onClick={() => setComponent('Rubros')}>
            <div className='flex gap-3'>
              <Bookmark className='text-blue-500' />
              <span className='font-medium'>Rubros</span>
            </div>
          </Card>
          <Card className='!shadow-none border mb-5 cursor-pointer'
            onClick={() => setComponent('Marcas')}>
            <div className='flex gap-3'>
              <Tag className='text-blue-500' />
              <span className='font-medium'>Marcas</span>
            </div>
          </Card>
          <Card className='!shadow-none border mb-5 cursor-pointer'
            onClick={() => setComponent('Usuarios')}>
            <div className='flex gap-3'>
              <User className='text-blue-500' />
              <span className='font-medium'>Usuarios</span>
            </div>
          </Card>
          <Card className='!shadow-none border mb-5 cursor-pointer'
            onClick={() => setComponent('Sucursales')}>
            <div className='flex gap-3'>
              <Store className='text-blue-500' />
              <span className='font-medium'>Sucursales</span>
            </div>
          </Card>
        </div>
        <div className='lg:w-5/6'>
          {renderedComponent}
        </div>
      </div>
    </div >
  )

}