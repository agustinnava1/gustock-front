import { useState } from 'react'

import { Card } from 'primereact/card'

import { Bookmark, Briefcase, Store, Tag, User } from 'lucide-react'
import { ProviderComponent } from './components/provider.component'
import { CategoryComponent } from './components/rubro.component'
import { BrandComponent } from './components/marca.component'
import { ShopComponent } from './components/shop.component'
import { UsuarioComponent } from './components/user.component'

export const PanelPagina = () => {
  const [component, setComponent] = useState('Provider')

  const componentMap = {
    Provider: <ProviderComponent />,
    Category: <CategoryComponent />,
    Brand: <BrandComponent />,
    User: <UsuarioComponent />,
    Shop: <ShopComponent />,
  }

  const renderedComponent = componentMap[component] || null;

  return (
    <div className='m-5'>
      <h2 className="text-4xl font-medium mb-5">Registros del sistema</h2>

      <div className='flex gap-5'>
        <div className='lg:w-1/6'>
          <Card className={`!shadow-none border mb-5 cursor-pointer ${component === 'Provider' ? '!bg-blue-500 !text-white' : ''}`}
            onClick={() => setComponent('Provider')}>
            <div className='flex gap-3'>
              <Briefcase className={`text-blue-500 ${component === 'Provider' ? '!text-white' : ''}`} />
              <span className='font-medium'>Proveedores</span>
            </div>
          </Card>
          <Card  className={`!shadow-none border mb-5 cursor-pointer ${component === 'Category' ? '!bg-blue-500 !text-white' : ''}`}
            onClick={() => setComponent('Category')}>
            <div className='flex gap-3'>
              <Bookmark className={`text-blue-500 ${component === 'Category' ? '!text-white' : ''}`} />
              <span className='font-medium'>Rubros</span>
            </div>
          </Card>
          <Card className={`!shadow-none border mb-5 cursor-pointer ${component === 'Brand' ? '!bg-blue-500 !text-white' : ''}`}
            onClick={() => setComponent('Brand')}>
            <div className='flex gap-3'>
              <Tag className={`text-blue-500 ${component === 'Brand' ? '!text-white' : ''}`} />
              <span className='font-medium'>Marcas</span>
            </div>
          </Card>
          <Card className={`!shadow-none border mb-5 cursor-pointer ${component === 'User' ? '!bg-blue-500 !text-white' : ''}`}
            onClick={() => setComponent('User')}>
            <div className='flex gap-3'>
              <User className={`text-blue-500 ${component === 'User' ? '!text-white' : ''}`} />
              <span className='font-medium'>Usuarios</span>
            </div>
          </Card>
          <Card className={`!shadow-none border mb-5 cursor-pointer ${component === 'Shop' ? '!bg-blue-500 !text-white' : ''}`}
            onClick={() => setComponent('Shop')}>
            <div className='flex gap-3'>
              <Store className={`text-blue-500 ${component === 'Shop' ? '!text-white' : ''}`} />
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