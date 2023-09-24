import { Card } from 'primereact/card';
import { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { formatCurrency, formatDate, formatDateLong, formatoFechaCompleto } from '../../helper/format';

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
    <div className='container mx-auto p-5 lg:px-44'>
      <h2 className='text-4xl font-medium'>{producto.descripcion}</h2>
      <div className='lg:flex justify-between mt-5'>
        <div className='lg:w-1/2 mb-5'>
          <Card className='!rounded-lg !shadow-md'>
            <img src='http://www.higieneplus.com.ar/wp-content/themes/higieneplus/images/producto-sin-foto-ficha.jpg' class="mx-auto w-[535px] max-h-[535px]"></img>
          </Card>
        </div>
        <div className='lg:w-1/2 lg:ml-5'>
          <Card title='Características' subTitle={`${producto.codigo}`} className='!rounded-lg !shadow-md mb-5'>
            <table class="min-w-full border text-sm mb-5">
              <thead class="bg-[#efefef] border-b">
                <tr><th colSpan={2} class="text-start p-2">Lista de precios</th></tr>
              </thead>
              <tbody>
                <tr className='text-start'>
                  <th className='text-start p-2 border w-[250px]' scope='row'>Precio efectivo</th>
                  <td class="border-b p-2">
                    {formatCurrency(producto.precioEfectivo)}
                  </td>
                </tr>
                <tr className='text-start'>
                  <th className='text-start p-2 border' scope='row'>Precio débito</th>
                  <td class="border-b p-2">
                    {formatCurrency(producto.precioDebito)}
                  </td>
                </tr>
                <tr className='text-start'>
                  <th className='text-start p-2 border' scope='row'>Precio crédito</th>
                  <td class="border-b p-2">
                    {formatCurrency(producto.precioCredito)}
                  </td>
                </tr>
              </tbody>
            </table>

            <table class="min-w-full border text-sm">
              <thead class="bg-[#efefef] border-b font-medium">
                <tr><th colSpan={2} class="text-start p-2">Datos del producto</th></tr>
              </thead>
              <tbody>
                <tr className='text-start'>
                  <th className='text-start p-2 border w-[250px]'>Proveedor</th>
                  <td class="border-b p-2">
                    {producto.proveedor?.razonSocial || 'Sin proveedor'}
                  </td>
                </tr>
                <tr className='text-start'>
                  <th className='text-start p-2 border'>Rubro</th>
                  <td class="border-b p-2">
                    {producto.rubro?.descripcion || 'Sin rubro'}
                  </td>
                </tr>
                <tr className='text-start'>
                  <th className='text-start p-2 border'>Marca</th>
                  <td class="border-b p-2">
                    {producto.marca?.descripcion || 'Sin marca'}
                  </td>
                </tr>
                <tr className='text-start'>
                  <th className='text-start p-2 border'>Última actualización de precio</th>
                  <td class="border-b p-2">
                    {producto.ultActPrecio ? formatoFechaCompleto(producto.ultActPrecio) : 'Sin registros'}
                  </td>
                </tr>
              </tbody>
            </table>
          </Card>
          <Card title='Ficha Técnica' className='!rounded-lg !shadow-md mb-5'>

          </Card>
        </div>
      </div>
      <Card title='Stock disponible en sucursales' className='!rounded-lg !shadow-md'>
        <table class="min-w-full border text-sm">
          <thead class="bg-[#efefef] border-b">
            <tr>
              <th class="text-left p-2">Sucursal</th>
              <th class="text-left p-2">Cantidad</th>
              <th class="text-left p-2">Última actualización</th>
            </tr>
          </thead>
          <tbody>
            <tr class="text-left border-b">
              <td class="p-2">
                {formatCurrency(producto.precioCredito)}
              </td>
              <td class="p-2">
                {formatCurrency(producto.precioCredito)}
              </td>
              <td class="p-2">
                {formatCurrency(producto.precioCredito)}
              </td>
            </tr>
          </tbody>
        </table>
      </Card>
    </div >

  )
}