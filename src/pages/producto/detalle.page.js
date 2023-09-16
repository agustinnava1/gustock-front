import { Card } from 'primereact/card';
import { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { formatCurrency } from '../../helper/format';

import ProductoServicio from '../../services/producto.service';

export const ProductoDetalle = () => {
  const { id } = useParams();

  const [producto, setProducto] = useState([]);

  useEffect(() => {
    cargarProducto()
  }, []);

  const cargarProducto = () => {
    ProductoServicio.obtenerPorId(id).then(data => {
      setProducto(data);
      console.log(producto);
    })
  };

  return (
    <div className='container mx-auto px-44'>
      <h2 className='text-4xl font-medium mt-5'>{producto.descripcion}</h2>
      <div className='lg:flex justify-between my-5'>
        <div className='w-1/2'>
          <Card className='drop-shadow !shadow-none mb-5'>
            <img src='https://http2.mlstatic.com/D_NQ_NP_961785-MLU71499008953_092023-O.webp' width="300px" class="mx-auto"></img>
          </Card>
        </div>
        <div className='w-1/2 ms-5'>
          <Card title='Características' className='drop-shadow !shadow-none mb-5'>
            <div className='text-xl'>
              <p>Código: {producto.codigo}</p>
              <hr className='my-3'></hr>
              <p>Efectivo: {formatCurrency(producto.precioEfectivo)}</p>
              <p>Debito: {formatCurrency(producto.precioDebito)}</p>
              <p>Credito: {formatCurrency(producto.precioCredito)}</p>
              <hr className='my-3'></hr>
              <p>Marca: {producto.marca?.descripcion || 'Sin marca'}</p>
              <p>Rubro: {producto.rubro?.descripcion || 'Sin rubro'}</p>
              <p>Proveedor: {producto.proveedor?.razonSocial || 'Sin proveedor'}</p>
            </div>
          </Card>
          <Card title='Ficha Técnica' className='drop-shadow !shadow-none'>

          </Card>
        </div>
      </div>
      <Card title='Stock disponible en sucursales' className='drop-shadow !shadow-none'>

      </Card>
    </div>

  )
}