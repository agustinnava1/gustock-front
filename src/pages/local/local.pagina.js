import React, { useEffect, useState } from 'react'

import { Card } from 'primereact/card'
import { Button } from 'primereact/button'
import { useParams } from 'react-router-dom'
import { Package, ShoppingCart } from 'lucide-react'

import ShopService from '../../services/local.servicio'
import ProductsComponent from './components/products.component'
import SalesComponent from './components/sales.component'

export const LocalPagina = () => {
  const { name } = useParams()
  const [shop, setShop] = useState([])
  const [selectedButton, setSelectedButton] = useState('Products');

  useEffect(() => {
    ShopService.getByName(name).then(data => {
      setShop(data)
    })
  }, []);

  const handleButtonClick = (buttonLabel) => {
    setSelectedButton(buttonLabel)
  }

  return (
    <div className='p-5'>
      <Card className='!shadow border mb-5'>
        <div className='flex justify-between'>
          <div className='flex items-center gap-3'>
            <h2 className="text-2xl font-bold">LOCAL {shop.nombre}</h2>
            <p className="text-xl">| {shop.direccion}</p>
          </div>
          <div className='flex items-center gap-3'>
            <div>
              <Button label='Productos' icon={<Package size={20} className='mr-3' />} iconPos='left' size='small'
                className={`!rounded-full w-full ${selectedButton === 'Products' ? 'bg-blue-500' : '!bg-white !text-blue-500'}`}
                onClick={() => handleButtonClick('Products')} />
            </div>
            {shop.tipo === 'LOCAL' &&
              <div>
                <Button label='Ventas' icon={<ShoppingCart size={20} className='mr-3' />} iconPos='left' size='small'
                  className={`!rounded-full w-full ${selectedButton === 'Sales' ? '!bg-blue-500' : '!bg-white !text-blue-500'}`}
                  onClick={() => handleButtonClick('Sales')} />
              </div>
            }
          </div>
        </div>
      </Card>

      {selectedButton === 'Sales' && <SalesComponent shop={name} />}
      {selectedButton === 'Products' && <ProductsComponent shop={name} />}
    </div>
  )
}

