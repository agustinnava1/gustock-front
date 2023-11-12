import { Card } from 'primereact/card';

import { ProveedorComponent } from '../panel/components/provider/proveedor.component';
import { Bookmark, Briefcase, Store, Tag, User } from 'lucide-react';

export const PanelPagina = () => {

  return (
    <div className='m-5'>
      <h2 className="text-4xl font-medium mb-5">Registros del sistema</h2>

      <div className='flex gap-5'>
        <div className='lg:w-1/6'>
          <Card className='!shadow-none border mb-5 cursor-pointer'>
            <div className='flex gap-3'>
              <Briefcase className='text-blue-500' />
              <span className='font-medium'>Proveedores</span>
            </div>
          </Card>
          <Card className='!shadow-none border mb-5 cursor-pointer'>
            <div className='flex gap-3'>
              <Bookmark className='text-blue-500' />
              <span className='font-medium'>Rubros</span>
            </div>
          </Card>
          <Card className='!shadow-none border mb-5 cursor-pointer'>
            <div className='flex gap-3'>
              <Tag className='text-blue-500' />
              <span className='font-medium'>Marcas</span>
            </div>
          </Card>
          <Card className='!shadow-none border mb-5 cursor-pointer'>
            <div className='flex gap-3'>
              <User className='text-blue-500' />
              <span className='font-medium'>Usuarios</span>
            </div>
          </Card>
          <Card className='!shadow-none border mb-5 cursor-pointer'>
            <div className='flex gap-3'>
              <Store className='text-blue-500' />
              <span className='font-medium'>Sucursales</span>
            </div>
          </Card>
        </div>
        <div className='lg:w-5/6'>
          <ProveedorComponent></ProveedorComponent>
        </div>
      </div>
    </div >
  )

}