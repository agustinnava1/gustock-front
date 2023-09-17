import { Card } from 'primereact/card';
import { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { formatCurrency, formatDate, formatDateLong } from '../../helper/format';

import ProductoServicio from '../../services/producto.service';
import { InputText } from 'primereact/inputtext';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

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
          <Card className='drop-shadow !shadow-none'>
            <img src='https://http2.mlstatic.com/D_NQ_NP_961785-MLU71499008953_092023-O.webp' width="300px" class="mx-auto"></img>
          </Card>
        </div>
        <div className='w-1/2 ms-5'>
          <Card title='Características'
            subTitle={`${producto.codigo}`} className='drop-shadow !shadow-none mb-5'>
            <div className='text-lg'>
              <div className='flex justify-between'>
                <span className='font-medium'>Precio efectivo</span>
                <p>{formatCurrency(producto.precioEfectivo)}</p>
              </div>
              <div className='flex justify-between'>
                <span className='font-medium'>Precio débito</span>
                <p>{formatCurrency(producto.precioDebito)}</p>
              </div>
              <div className='flex justify-between'>
                <span className='font-medium'>Precio crédito</span>
                <p>{formatCurrency(producto.precioCredito)}</p>
              </div>
              <hr className='my-3'></hr>
              <div className='flex justify-between'>
                <span className='font-medium'>Proveedor</span>
                <p>{producto.proveedor?.razonSocial || 'Sin proveedor'}</p>
              </div>
              <div className='flex justify-between'>
                <span className='font-medium'>Rubro</span>
                <p>{producto.rubro?.descripcion || 'Sin rubro'}</p>
              </div>
              <div className='flex justify-between'>
                <span className='font-medium'>Marca</span>
                <p>{producto.marca?.descripcion || 'Sin marca'}</p>
              </div>
              <hr className='my-3'></hr>
              <span className='font-medium'>Última actualización de precio</span>
              <p>{producto.ultActPrecio? formatDateLong(producto.ultActPrecio) : 'Sin registros'}</p>
            </div>
          </Card>
          <Card title='Ficha Técnica' className='drop-shadow !shadow-none'>

          </Card>
        </div>
      </div>
      <Card title='Stock disponible en sucursales' className='drop-shadow !shadow-none'>
        <DataTable editMode="cell" tableStyle={{ minWidth: '50rem' }} emptyMessage="No se encontraron unidades" size="small">
          <Column header="Sucursal" style={{ width: '33%' }}></Column>
          <Column header="Cantidad" style={{ width: '33%' }}></Column>
          <Column header="Última actualización" style={{ width: '33%' }}></Column>
        </DataTable>
      </Card>
    </div>

  )
}