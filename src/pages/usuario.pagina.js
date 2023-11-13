import { Card } from 'primereact/card'
import { Link } from 'react-router-dom'
import { Button } from 'primereact/button'
import { useEffect, useState } from 'react'

import ShopService from '../services/local.servicio'

export const UsuarioPagina = () => {
  const [shop, setShop] = useState([]);

  useEffect(() => {
    ShopService.getByName('BIEN ALTO').then(data => {
      setShop(data)
    })
  }, [])

  return (
    <div className='p-5'>
      <Card className='!shadow-none border mb-5'>
        <h2>Bienvenido</h2>
      </Card>

      <div>

      </div>
    </div>
  )
}